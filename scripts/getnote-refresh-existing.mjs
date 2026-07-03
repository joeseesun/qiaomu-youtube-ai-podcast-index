import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const limit = Number.parseInt(process.env.GETNOTE_REFRESH_LIMIT || "0", 10);
const pauseSeconds = Number.parseInt(process.env.GETNOTE_REFRESH_PAUSE_SECONDS || "12", 10);
const apiKey = process.env.GETNOTE_API_KEY;
const clientId = process.env.GETNOTE_CLIENT_ID;
const requestTimeoutMs = Number.parseInt(process.env.GETNOTE_REQUEST_TIMEOUT_MS || "60000", 10);
const statePath = path.join(root, "data", "getnote-sync.json");
const transcriptRoot = path.join(root, "content", "transcripts");
const summaryRoot = path.join(root, "content", "summaries");

if (!apiKey || !clientId) {
  throw new Error("GETNOTE_API_KEY and GETNOTE_CLIENT_ID are required.");
}

const podcasts = readJson("data/podcasts.json").podcasts;
const state = fs.existsSync(statePath) ? readJson("data/getnote-sync.json") : { version: 1, items: {} };
const candidates = collectCandidates().slice(0, limit > 0 ? limit : undefined);

if (candidates.length === 0) {
  console.log("No existing note IDs need refresh.");
  process.exit(0);
}

let updatedTranscripts = 0;
let updatedSummaries = 0;

for (const [index, candidate] of candidates.entries()) {
  const result = await refreshCandidate(candidate);
  updatedTranscripts += result.transcript ? 1 : 0;
  updatedSummaries += result.summary ? 1 : 0;
  if (index < candidates.length - 1 && pauseSeconds > 0) {
    await sleep(pauseSeconds * 1000);
  }
}

refreshEpisodeIndex();
writeJson("data/getnote-sync.json", state);
console.log(`Refreshed ${candidates.length} existing note(s): transcripts=${updatedTranscripts}, summaries=${updatedSummaries}.`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      const key = `${podcast.id}/${episode.id}`;
      const itemState = state.items?.[key];
      if (!itemState?.noteId) continue;
      const transcriptPath = episode.transcript?.localPath ? path.join(root, episode.transcript.localPath) : "";
      const summaryPath = episode.summary?.localPath ? path.join(root, episode.summary.localPath) : "";
      const needsTranscript = !transcriptPath || !fs.existsSync(transcriptPath);
      const needsSummary = !summaryPath || !fs.existsSync(summaryPath);
      if (!needsTranscript && !needsSummary) continue;
      items.push({ podcast, episode, episodeData, episodeFile, itemState, needsTranscript, needsSummary });
    }
  }
  return items;
}

async function refreshCandidate({ podcast, episode, episodeData, episodeFile, itemState, needsTranscript, needsSummary }) {
  const key = `${podcast.id}/${episode.id}`;
  const detail = await getnoteRequest("GET", `/open/api/v1/resource/note/detail?id=${encodeURIComponent(itemState.noteId)}`);
  const note = detail?.data?.note || {};
  const webTranscript = await tryGetWebTranscript(itemState.noteId);
  const transcriptText = bestTranscriptText(webTranscript, note);
  const summaryText = bestSummaryText(note, webTranscript);

  let changed = false;
  let transcript = false;
  let summary = false;

  if (needsTranscript && transcriptText.length > 500) {
    const transcriptPath = writeTranscript(podcast, episode, itemState, transcriptText);
    episode.transcript = {
      status: "ready",
      remoteLinks: [],
      localPath: relativePath(transcriptPath),
      localUrl: `/${relativePath(transcriptPath)}`,
      sourceType: webTranscript ? "internal-web-refresh" : "internal-openapi-refresh",
      note: "由内部转写流程刷新生成。"
    };
    addResource(episode, { label: "Transcript", url: episode.transcript.localUrl, type: "transcript" });
    changed = true;
    transcript = true;
  }

  if (needsSummary && summaryText.length > 40) {
    const summaryPath = writeSummary(podcast, episode, itemState, summaryText, note);
    episode.summary = {
      status: "ready",
      localPath: relativePath(summaryPath),
      localUrl: `/${relativePath(summaryPath)}`,
      note: "由内部总结流程刷新生成。"
    };
    addResource(episode, { label: "总结笔记", url: episode.summary.localUrl, type: "summary" });
    changed = true;
    summary = true;
  }

  itemState.webTranscriptStatus = webTranscript ? "ready" : "unavailable";
  itemState.hasOpenApiSummary = summaryText.length > 40;
  itemState.hasTranscript = Boolean(episode.transcript?.localPath);
  itemState.hasSummary = Boolean(episode.summary?.localPath);
  itemState.refreshedAt = new Date().toISOString();
  if (itemState.hasTranscript) {
    itemState.taskStatus = "success";
    itemState.error = null;
  } else if (needsTranscript) {
    itemState.taskStatus = itemState.taskStatus || "no_transcript";
    itemState.error = itemState.error || "No transcript text available from note detail or web transcript API.";
  }

  if (changed) {
    fs.writeFileSync(episodeFile, `${JSON.stringify(episodeData, null, 2)}\n`, "utf8");
  }

  console.log(`${key}: transcript=${episode.transcript?.localPath ? "ready" : "missing"} summary=${episode.summary?.localPath ? "ready" : "missing"}`);
  return { transcript, summary };
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

async function tryGetWebTranscript(noteId) {
  const jwt = await getValidJwt();
  if (!jwt) return null;
  const response = await fetchWithTimeout(`https://get-notes.luojilab.com/voicenotes/web/notes/${noteId}/links/detail`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
      Origin: "https://www.biji.com",
      Referer: "https://www.biji.com/"
    }
  });
  const data = await response.json().catch(() => null);
  if (data?.h?.c === 0) return data.c;
  return null;
}

async function getValidJwt() {
  const tokenFile = path.join(process.env.HOME || "", ".claude", "skills", "getnote", "tokens.json");
  if (!fs.existsSync(tokenFile)) return null;
  const tokens = JSON.parse(fs.readFileSync(tokenFile, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  if (now >= Number(tokens.refresh_token_expire_at || 0)) return null;
  if (now < Number(tokens.token_expire_at || 0) - 300) return tokens.token;

  const response = await fetchWithTimeout("https://notes-api.biji.com/account/v2/web/user/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://www.biji.com",
      Referer: "https://www.biji.com/"
    },
    body: JSON.stringify({ refresh_token: tokens.refresh_token })
  });
  const data = await response.json();
  if (data?.h?.c !== 0) return null;
  const next = data.c.token;
  const merged = {
    ...tokens,
    token: next.token,
    token_expire_at: next.token_expire_at,
    refresh_token: next.refresh_token || tokens.refresh_token,
    refresh_token_expire_at: next.refresh_token_expire_at || tokens.refresh_token_expire_at
  };
  fs.writeFileSync(tokenFile, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  return merged.token;
}

function bestTranscriptText(webTranscript, note) {
  const candidates = [
    webTranscript?.content,
    note?.audio?.transcript,
    note?.ref_content,
    note?.web_page?.content
  ].map((value) => String(value || "").trim());
  return candidates.find((value) => value.length > 500) || "";
}

function bestSummaryText(note, webTranscript) {
  const candidates = [
    note?.content,
    note?.web_page?.excerpt,
    webTranscript?.summary,
    webTranscript?.title
  ].map((value) => String(value || "").trim());
  return candidates.find((value) => value.length > 40) || "";
}

function writeTranscript(podcast, episode, itemState, transcriptText) {
  const dir = path.join(transcriptRoot, podcast.id);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${episode.id}.md`);
  const body = [
    `# ${episode.title}`,
    "",
    `- Podcast: ${podcast.title}`,
    `- Source: ${itemState.sourceUrl}`,
    `- 获取时间: ${new Date().toISOString()}`,
    "",
    "## Transcript",
    "",
    transcriptText.trim(),
    ""
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
}

function writeSummary(podcast, episode, itemState, summaryText, note) {
  const dir = path.join(summaryRoot, podcast.id);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${episode.id}.md`);
  const title = note?.title || episode.title;
  const body = [
    `# ${title}`,
    "",
    `- Podcast: ${podcast.title}`,
    `- Episode: ${episode.title}`,
    `- Source: ${itemState.sourceUrl}`,
    `- 获取时间: ${new Date().toISOString()}`,
    "",
    "## 总结笔记",
    "",
    summaryText.trim(),
    ""
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
}

function addResource(episode, resource) {
  episode.resources = Array.isArray(episode.resources) ? episode.resources : [];
  if (!episode.resources.some((item) => item.type === resource.type && item.url === resource.url)) {
    episode.resources.push(resource);
  }
}

function refreshEpisodeIndex() {
  const indexPath = path.join(root, "data", "episodes-index.json");
  const previous = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, "utf8")) : {};
  const podcastsIndex = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodes = JSON.parse(fs.readFileSync(episodeFile, "utf8")).episodes || [];
    podcastsIndex.push({
      id: podcast.id,
      title: podcast.title,
      episodeCount: episodes.length,
      transcriptCount: episodes.filter((episode) => episode.transcript?.localPath).length,
      articleCount: episodes.filter((episode) => episode.article?.localPath).length,
      summaryCount: episodes.filter((episode) => episode.summary?.localPath).length,
      error: previous.podcasts?.find((item) => item.id === podcast.id)?.error || null
    });
  }
  writeJson("data/episodes-index.json", {
    generatedAt: new Date().toISOString(),
    limit: previous.limit || null,
    podcasts: podcastsIndex
  });
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

function relativePath(absolute) {
  return path.relative(root, absolute).split(path.sep).join("/");
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
