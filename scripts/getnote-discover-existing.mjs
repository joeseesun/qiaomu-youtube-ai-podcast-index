import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const apiKey = process.env.GETNOTE_API_KEY;
const clientId = process.env.GETNOTE_CLIENT_ID;
const maxPages = Number.parseInt(process.env.GETNOTE_DISCOVER_PAGES || "12", 10);
const pauseSeconds = Number.parseInt(process.env.GETNOTE_DISCOVER_PAUSE_SECONDS || "8", 10);
const requestTimeoutMs = Number.parseInt(process.env.GETNOTE_REQUEST_TIMEOUT_MS || "60000", 10);
const statePath = path.join(root, "data", "getnote-sync.json");
const podcasts = readJson("data/podcasts.json").podcasts;
const state = fs.existsSync(statePath) ? readJson("data/getnote-sync.json") : { version: 1, items: {} };

if (!apiKey || !clientId) {
  throw new Error("GETNOTE_API_KEY and GETNOTE_CLIENT_ID are required.");
}

const candidates = collectCandidates();
if (candidates.length === 0) {
  console.log("No missing transcript candidates need note discovery.");
  process.exit(0);
}

const notes = await readRecentNotes();
let discovered = 0;

for (const candidate of candidates) {
  if (candidate.itemState?.noteId) continue;
  const match = findMatchingNote(candidate, notes);
  if (!match) continue;
  state.items[candidate.key] = {
    ...(candidate.itemState || {}),
    podcastId: candidate.podcast.id,
    episodeId: candidate.episode.id,
    title: candidate.episode.title,
    sourceUrl: candidate.episode.youtube?.url || candidate.episode.episodeUrl || candidate.episode.audioUrl || null,
    taskId: candidate.itemState?.taskId || null,
    noteId: String(match.id),
    taskStatus: candidate.itemState?.taskStatus || "discovered",
    saveStatus: candidate.itemState?.saveStatus || "discovered",
    discoveredAt: new Date().toISOString(),
    discoveredFromTitle: match.title,
    updatedAt: new Date().toISOString(),
    attempts: Array.isArray(candidate.itemState?.attempts) ? candidate.itemState.attempts : []
  };
  discovered += 1;
  console.log(`${candidate.key}: discovered existing note ${match.id}`);
}

writeJson("data/getnote-sync.json", state);
console.log(`Discovered ${discovered} existing Getnote note(s) from ${notes.length} recent note(s).`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      const transcriptPath = episode.transcript?.localPath ? path.join(root, episode.transcript.localPath) : "";
      if (transcriptPath && fs.existsSync(transcriptPath)) continue;
      const key = `${podcast.id}/${episode.id}`;
      items.push({
        key,
        podcast,
        episode,
        itemState: state.items?.[key] || null,
        needles: noteTitleNeedles(podcast, episode)
      });
    }
  }
  return items;
}

function noteTitleNeedles(podcast, episode) {
  return [
    `AI播客：${podcast.title} - ${episode.title}`,
    `${podcast.title} - ${episode.title}`,
    episode.title,
    episode.title.replace(/^#\d+:\s*/, ""),
    episode.youtube?.title || ""
  ].map(normalizeTitle).filter((value, index, array) => value.length > 12 && array.indexOf(value) === index);
}

async function readRecentNotes() {
  const notes = [];
  let cursor = "0";
  for (let page = 1; page <= maxPages; page += 1) {
    const data = await getnoteRequest("GET", `/open/api/v1/resource/note/list?since_id=${encodeURIComponent(cursor)}`);
    const pageNotes = data?.data?.notes || [];
    notes.push(...pageNotes);
    cursor = String(data?.data?.next_cursor || "");
    if (!data?.data?.has_more || !cursor) break;
    if (pauseSeconds > 0) await sleep(pauseSeconds * 1000);
  }
  return notes;
}

function findMatchingNote(candidate, notes) {
  for (const note of notes) {
    const haystack = normalizeTitle([
      note.title,
      note.content,
      note.ref_content,
      ...(note.tags || []).map((tag) => tag.name || tag)
    ].filter(Boolean).join(" "));
    if (!haystack) continue;
    const strongTitleMatch = candidate.needles.some((needle) => haystack.includes(needle) || needle.includes(haystack));
    const tagMatch = haystack.includes("ai播客") || haystack.includes("youtubeqiaomuai");
    if (strongTitleMatch && tagMatch) return note;
  }
  return null;
}

async function getnoteRequest(method, apiPath) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetchWithTimeout(`https://openapi.biji.com${apiPath}`, {
      method,
      headers: {
        Authorization: apiKey,
        "X-Client-ID": clientId
      }
    });
    const text = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`Note service API returned non-JSON ${response.status}: ${text.slice(0, 200)}`);
    }
    if (response.ok && parsed.success !== false) return parsed;
    const reason = parsed?.error?.reason || "";
    const code = parsed?.error?.code;
    if ((code === 10202 || /qps|rate/i.test(reason)) && attempt < 3) {
      const waitSeconds = 30 * (attempt + 1);
      console.log(`Note service read rate limit (${reason || code}); waiting ${waitSeconds}s before retry.`);
      await sleep(waitSeconds * 1000);
      continue;
    }
    throw new Error(`Note service API failed: ${JSON.stringify(redactError(parsed))}`);
  }
  throw new Error("Note service API failed after retries.");
}

function normalizeTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&amp;/g, " and ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "")
    .trim();
}

function redactError(value) {
  if (!value || typeof value !== "object") return value;
  return JSON.parse(JSON.stringify(value, (key, val) => /token|key|secret|authorization/i.test(key) ? "[redacted]" : val));
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
}

function writeJson(relative, value) {
  fs.mkdirSync(path.dirname(path.join(root, relative)), { recursive: true });
  fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchWithTimeout(url, options = {}) {
  const timeout = Number.isFinite(requestTimeoutMs) && requestTimeoutMs > 0 ? requestTimeoutMs : 60000;
  return fetch(url, {
    ...options,
    signal: options.signal || AbortSignal.timeout(timeout)
  });
}
