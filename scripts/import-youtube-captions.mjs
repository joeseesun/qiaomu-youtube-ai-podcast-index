import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const limit = Number.parseInt(process.env.YOUTUBE_CAPTION_LIMIT || "0", 10);
const unavailableCooldownHours = Number.parseFloat(process.env.YOUTUBE_CAPTION_UNAVAILABLE_COOLDOWN_HOURS || "24");
const unavailableCooldownMs = Math.max(0, Number.isFinite(unavailableCooldownHours) ? unavailableCooldownHours * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);
const requestTimeoutMs = Number.parseInt(process.env.YOUTUBE_CAPTION_REQUEST_TIMEOUT_MS || "60000", 10);
const statePath = path.join(root, "data", "youtube-caption-state.json");
const transcriptRoot = path.join(root, "content", "transcripts");
const podcasts = readJson("data/podcasts.json").podcasts;
const state = fs.existsSync(statePath) ? readJson("data/youtube-caption-state.json") : { version: 1, videos: {} };
const candidates = collectCandidates().slice(0, limit > 0 ? limit : undefined);

if (candidates.length === 0) {
  console.log("No YouTube caption candidates found.");
  process.exit(0);
}

let imported = 0;
let unavailable = 0;

for (const candidate of candidates) {
  const result = await importCaption(candidate);
  if (result) {
    imported += 1;
  } else {
    unavailable += 1;
  }
}

writeJson("data/youtube-caption-state.json", state);
if (imported > 0) refreshEpisodeIndex();
console.log(`YouTube caption import complete: imported=${imported}, unavailable=${unavailable}.`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      const transcriptPath = episode.transcript?.localPath ? path.join(root, episode.transcript.localPath) : "";
      if (transcriptPath && fs.existsSync(transcriptPath)) continue;
      const videoId = youtubeVideoId(episode.youtube?.url || episode.episodeUrl);
      if (!videoId) continue;
      if (recentlyUnavailable(videoId)) continue;
      items.push({ podcast, episode, episodeData, episodeFile, videoId });
    }
  }
  return items;
}

async function importCaption({ podcast, episode, episodeData, episodeFile, videoId }) {
  const tracks = await fetchCaptionTracks(videoId);
  const track = pickCaptionTrack(tracks);
  if (!track) {
    markUnavailable(videoId, "no_public_caption_track");
    console.log(`${podcast.id}/${episode.id}: no public caption track for ${videoId}`);
    return false;
  }

  const captionText = await fetchCaptionText(track);
  if (captionText.length < 500) {
    markUnavailable(videoId, "caption_too_short");
    console.log(`${podcast.id}/${episode.id}: caption track too short for ${videoId}`);
    return false;
  }

  const transcriptPath = writeTranscript(podcast, episode, videoId, track, captionText);
  episode.transcript = {
    status: "ready",
    remoteLinks: [],
    localPath: relativePath(transcriptPath),
    localUrl: `/${relativePath(transcriptPath)}`,
    sourceType: "youtube-caption",
    note: "由 YouTube 公共字幕导入。"
  };
  addResource(episode, { label: "Transcript", url: episode.transcript.localUrl, type: "transcript" });
  state.videos[videoId] = {
    status: "imported",
    episodeId: episode.id,
    podcastId: podcast.id,
    checkedAt: new Date().toISOString(),
    transcriptPath: episode.transcript.localPath
  };
  fs.writeFileSync(episodeFile, `${JSON.stringify(episodeData, null, 2)}\n`, "utf8");
  console.log(`${podcast.id}/${episode.id}: imported caption track ${track.languageCode || track.name || ""} for ${videoId}`);
  return true;
}

function recentlyUnavailable(videoId) {
  const item = state.videos?.[videoId];
  if (!item || item.status !== "unavailable") return false;
  const checkedAt = Date.parse(item.checkedAt || "");
  if (!Number.isFinite(checkedAt)) return false;
  return Date.now() - checkedAt < unavailableCooldownMs;
}

function markUnavailable(videoId, reason) {
  state.videos[videoId] = {
    status: "unavailable",
    reason,
    checkedAt: new Date().toISOString()
  };
}

async function fetchCaptionTracks(videoId) {
  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  const response = await fetchWithTimeout(watchUrl, {
    headers: { "User-Agent": "Mozilla/5.0 QiaomuAIIndex/0.3" }
  });
  if (!response.ok) return [];
  const html = await response.text();
  const jsonText = extractCaptionTracksJson(html);
  if (!jsonText) return [];
  const data = JSON.parse(jsonText);
  return Array.isArray(data) ? data : [];
}

function extractCaptionTracksJson(html) {
  const key = '"captionTracks":';
  const start = html.indexOf(key);
  if (start < 0) return "";
  const arrayStart = html.indexOf("[", start + key.length);
  if (arrayStart < 0) return "";
  let depth = 0;
  for (let index = arrayStart; index < html.length; index += 1) {
    const char = html[index];
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return html.slice(arrayStart, index + 1);
    }
  }
  return "";
}

function pickCaptionTrack(tracks) {
  const usable = tracks.filter((track) => track?.baseUrl);
  if (usable.length === 0) return null;
  return usable.find((track) => /^en\b/i.test(track.languageCode || ""))
    || usable.find((track) => /^\.?en\b/i.test(track.vssId || ""))
    || usable.find((track) => /english/i.test(track.name?.simpleText || track.name?.runs?.[0]?.text || ""))
    || usable[0];
}

async function fetchCaptionText(track) {
  const url = new URL(track.baseUrl);
  url.searchParams.set("fmt", "json3");
  const response = await fetchWithTimeout(url, {
    headers: { "User-Agent": "Mozilla/5.0 QiaomuAIIndex/0.3" }
  });
  if (!response.ok) return "";
  const text = await response.text();
  try {
    return parseJson3Caption(JSON.parse(text));
  } catch {
    return parseXmlCaption(text);
  }
}

function parseJson3Caption(data) {
  const lines = [];
  for (const event of data.events || []) {
    const text = (event.segs || [])
      .map((seg) => seg.utf8 || "")
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    const stamp = timestamp(Number(event.tStartMs || 0));
    lines.push(`[${stamp}] ${text}`);
  }
  return mergeDuplicateLines(lines).join("\n\n");
}

function parseXmlCaption(raw) {
  const lines = [];
  for (const match of raw.matchAll(/<text[^>]*start="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g)) {
    const seconds = Number.parseFloat(match[1] || "0");
    const text = decodeHtml(match[2])
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    lines.push(`[${timestamp(seconds * 1000)}] ${text}`);
  }
  return mergeDuplicateLines(lines).join("\n\n");
}

function mergeDuplicateLines(lines) {
  const merged = [];
  for (const line of lines) {
    if (line === merged[merged.length - 1]) continue;
    merged.push(line);
  }
  return merged;
}

function writeTranscript(podcast, episode, videoId, track, captionText) {
  const dir = path.join(transcriptRoot, podcast.id);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${episode.id}.md`);
  const langName = track.name?.simpleText || track.name?.runs?.[0]?.text || track.languageCode || "unknown";
  const body = [
    `# ${episode.title}`,
    "",
    `- Podcast: ${podcast.title}`,
    `- Source: https://www.youtube.com/watch?v=${videoId}`,
    `- Caption language: ${langName}`,
    `- 获取时间: ${new Date().toISOString()}`,
    "",
    "## Transcript",
    "",
    captionText.trim(),
    ""
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
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

function youtubeVideoId(url) {
  const value = String(url || "");
  return matchFirst(value, /[?&]v=([A-Za-z0-9_-]{11})/)
    || matchFirst(value, /youtu\.be\/([A-Za-z0-9_-]{11})/)
    || matchFirst(value, /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
}

function timestamp(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function addResource(episode, resource) {
  episode.resources = Array.isArray(episode.resources) ? episode.resources : [];
  if (!episode.resources.some((item) => item.type === resource.type && item.url === resource.url)) {
    episode.resources.push(resource);
  }
}

function matchFirst(value, regex) {
  return String(value || "").match(regex)?.[1] || "";
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

function fetchWithTimeout(url, options = {}) {
  const timeout = Number.isFinite(requestTimeoutMs) && requestTimeoutMs > 0 ? requestTimeoutMs : 60000;
  return fetch(url, {
    ...options,
    signal: options.signal || AbortSignal.timeout(timeout)
  });
}
