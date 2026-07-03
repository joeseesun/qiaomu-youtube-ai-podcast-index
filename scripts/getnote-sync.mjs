import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const limit = Number.parseInt(process.env.GETNOTE_LIMIT || "1", 10);
const pollSeconds = Number.parseInt(process.env.GETNOTE_POLL_SECONDS || "20", 10);
const maxPolls = Number.parseInt(process.env.GETNOTE_MAX_POLLS || "18", 10);
const createPauseSeconds = Number.parseInt(process.env.GETNOTE_CREATE_PAUSE_SECONDS || "65", 10);
const failedCooldownHours = Number.parseFloat(process.env.GETNOTE_FAILED_COOLDOWN_HOURS || "24");
const failedCooldownMs = Math.max(0, Number.isFinite(failedCooldownHours) ? failedCooldownHours * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);
const apiKey = process.env.GETNOTE_API_KEY;
const clientId = process.env.GETNOTE_CLIENT_ID;
const requestTimeoutMs = Number.parseInt(process.env.GETNOTE_REQUEST_TIMEOUT_MS || "60000", 10);
const statePath = path.join(root, "data", "getnote-sync.json");
const quotaPath = path.join(root, "data", "getnote-quota.json");
const transcriptRoot = path.join(root, "content", "transcripts");
const summaryRoot = path.join(root, "content", "summaries");
const retryableFailureStatuses = new Set(["failed", "no_transcript"]);

if (!apiKey || !clientId) {
  throw new Error("GETNOTE_API_KEY and GETNOTE_CLIENT_ID are required.");
}

fs.mkdirSync(path.dirname(statePath), { recursive: true });
fs.mkdirSync(transcriptRoot, { recursive: true });
fs.mkdirSync(summaryRoot, { recursive: true });

const podcasts = readJson("data/podcasts.json").podcasts;
const state = fs.existsSync(statePath) ? readJson("data/getnote-sync.json") : { version: 1, items: {} };
const candidates = collectCandidates();
sortCandidates(candidates);
const picked = candidates.slice(0, limit);

if (picked.length === 0) {
  console.log("No note-service candidates found.");
  process.exit(0);
}

for (const [index, candidate] of picked.entries()) {
  await processEpisode(candidate);
  if (index < picked.length - 1 && createPauseSeconds > 0) {
    console.log(`Waiting ${createPauseSeconds}s before next note-service item to avoid rate limits.`);
    await sleep(createPauseSeconds * 1000);
  }
}

refreshEpisodeIndex();
writeJson("data/getnote-sync.json", state);
console.log(`Processed ${picked.length} note-service candidate(s).`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      if (episode.transcript?.localPath && episode.summary?.localPath) continue;
      const sourceUrls = candidateSourceUrls(episode);
      if (sourceUrls.length === 0) continue;
      if (!isCandidateRetryable(`${podcast.id}/${episode.id}`, sourceUrls)) continue;
      items.push({ podcast, episode, episodeData, episodeFile, sourceUrls });
    }
  }
  return items;
}

async function processEpisode({ podcast, episode, episodeData, episodeFile, sourceUrls }) {
  const key = `${podcast.id}/${episode.id}`;
  const existing = state.items[key];
  if (existing?.taskStatus === "success" && existing.hasTranscript === false && !episode.transcript?.localPath) {
    existing.taskStatus = "no_transcript";
    existing.error = existing.error || "No transcript text available from note detail or web transcript API.";
  }
  const attempted = failedSourceUrls(existing);
  const sourceUrl = existing?.taskStatus && !retryableFailureStatuses.has(existing.taskStatus)
    ? existing.sourceUrl
    : sourceUrls.find((url) => !attempted.has(url)) || sourceUrls[0];
  const itemState = state.items[key] || {
    podcastId: podcast.id,
    episodeId: episode.id,
    title: episode.title,
    sourceUrl,
    attempts: [],
    createdAt: new Date().toISOString()
  };
  state.items[key] = itemState;
  itemState.attempts = Array.isArray(itemState.attempts) ? itemState.attempts : [];
  if (retryableFailureStatuses.has(itemState.taskStatus)) {
    itemState.attempts.push({
      sourceUrl: itemState.sourceUrl,
      taskId: itemState.taskId,
      noteId: itemState.noteId,
      status: itemState.taskStatus,
      error: itemState.error || null,
      at: new Date().toISOString()
    });
    itemState.sourceUrl = sourceUrl;
    itemState.taskId = null;
    itemState.noteId = null;
    itemState.taskStatus = null;
    itemState.error = null;
    itemState.updatedAt = new Date().toISOString();
  }

  if (!itemState.taskId && !itemState.noteId) {
    const save = await getnoteRequest("POST", "/open/api/v1/resource/note/save", {
      title: `AI播客：${podcast.title} - ${episode.title}`.slice(0, 180),
      note_type: "link",
      link_url: sourceUrl,
      tags: buildTags(podcast.id)
    });
    const task = save?.data?.tasks?.[0];
    itemState.taskId = task?.task_id || null;
    itemState.noteId = save?.data?.id ? String(save.data.id) : null;
    itemState.saveStatus = save?.success === true ? "created" : "failed";
    itemState.updatedAt = new Date().toISOString();
    console.log(`${key}: created source link note task=${itemState.taskId || "none"} note=${itemState.noteId || "none"}`);
    writeJson("data/getnote-sync.json", state);
  }

  if (itemState.taskId && !itemState.noteId) {
    const progress = await waitForTask(itemState.taskId);
    itemState.taskStatus = progress?.status || "unknown";
    itemState.noteId = progress?.note_id ? String(progress.note_id) : null;
    itemState.error = progress?.error_msg || itemState.error || null;
    itemState.updatedAt = new Date().toISOString();
    writeJson("data/getnote-sync.json", state);
  }

  if (!itemState.noteId) {
    console.log(`${key}: no note_id yet; skipping artifact update.`);
    return;
  }

  const detail = await getnoteRequest("GET", `/open/api/v1/resource/note/detail?id=${encodeURIComponent(itemState.noteId)}`);
  const note = detail?.data?.note || {};
  const webTranscript = await tryGetWebTranscript(itemState.noteId);
  const transcriptText = bestTranscriptText(webTranscript, note);
  const summaryText = bestSummaryText(note, webTranscript);

  let changed = false;
  if (transcriptText.length > 500 && !episode.transcript?.localPath) {
    const transcriptPath = writeTranscript(podcast, episode, itemState, transcriptText);
    episode.transcript = {
      status: "ready",
      remoteLinks: [],
      localPath: relativePath(transcriptPath),
      localUrl: `/${relativePath(transcriptPath)}`,
      sourceType: webTranscript ? "internal-web" : "internal-openapi",
      note: "由内部转写流程生成。"
    };
    addResource(episode, { label: "Transcript", url: episode.transcript.localUrl, type: "transcript" });
    changed = true;
  }

  if (summaryText.length > 40 && !episode.summary?.localPath) {
    const summaryPath = writeSummary(podcast, episode, itemState, summaryText, note);
    episode.summary = {
      status: "ready",
      localPath: relativePath(summaryPath),
      localUrl: `/${relativePath(summaryPath)}`,
      note: "由内部总结流程生成。"
    };
    addResource(episode, { label: "总结笔记", url: episode.summary.localUrl, type: "summary" });
    changed = true;
  }

  itemState.webTranscriptStatus = webTranscript ? "ready" : "unavailable";
  itemState.hasOpenApiSummary = summaryText.length > 40;
  itemState.hasTranscript = Boolean(episode.transcript?.localPath);
  itemState.hasSummary = Boolean(episode.summary?.localPath);
  if (itemState.hasTranscript) {
    itemState.taskStatus = itemState.taskStatus === "failed" ? "success" : itemState.taskStatus;
    itemState.error = null;
  } else {
    itemState.taskStatus = "no_transcript";
    itemState.error = "No transcript text available from note detail or web transcript API.";
  }
  itemState.updatedAt = new Date().toISOString();

  if (changed) {
    fs.writeFileSync(episodeFile, `${JSON.stringify(episodeData, null, 2)}\n`, "utf8");
  }
  console.log(`${key}: transcript=${episode.transcript?.localPath ? "ready" : "missing"} summary=${episode.summary?.localPath ? "ready" : "missing"}`);
}

async function waitForTask(taskId) {
  for (let index = 0; index < maxPolls; index += 1) {
    const response = await getnoteRequest("POST", "/open/api/v1/resource/note/task/progress", { task_id: taskId });
    const data = response?.data || {};
    console.log(`task ${taskId}: ${index + 1}/${maxPolls} status=${data.status || "unknown"}`);
    if (data.status === "success" || data.status === "failed") return data;
    await sleep(pollSeconds * 1000);
  }
  return { status: "timeout" };
}

async function getnoteRequest(method, apiPath, body) {
  const url = apiPath.startsWith("http") ? apiPath : `https://openapi.biji.com${apiPath}`;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetchWithTimeout(url, {
      method,
      headers: {
        Authorization: apiKey,
        "X-Client-ID": clientId,
        ...(body ? { "Content-Type": "application/json" } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    const text = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`Note service API returned non-JSON ${response.status}: ${text.slice(0, 200)}`);
    }
    if (response.ok && parsed.success !== false) {
      return parsed;
    }
    const reason = parsed?.error?.reason || "";
    const code = parsed?.error?.code;
    if ((code === 10202 || /qps|rate/i.test(reason)) && attempt < 3) {
      const waitSeconds = 30 * (attempt + 1);
      console.log(`Note service rate limit (${reason || code}); waiting ${waitSeconds}s before retry.`);
      await sleep(waitSeconds * 1000);
      continue;
    }
    if (isDailyWriteQuotaExceeded(parsed)) {
      writeJson("data/getnote-quota.json", {
        status: "write_note_daily_exceeded",
        resetAt: parsed.error?.rate_limit?.write_note?.daily?.reset_at || null,
        remaining: parsed.error?.rate_limit?.write_note?.daily?.remaining ?? null,
        updatedAt: new Date().toISOString()
      });
      console.error(`Note service write_note daily quota exceeded; wrote ${quotaPath}.`);
      process.exit(75);
    }
    throw new Error(`Note service API failed: ${JSON.stringify(redactError(parsed))}`);
  }
  throw new Error("Note service API failed after retries.");
}

function isDailyWriteQuotaExceeded(parsed) {
  const error = parsed?.error || {};
  return error.code === 10203
    || error.reason === "quota_daily_exceeded"
    || error.rate_limit?.write_note?.daily?.remaining === 0;
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

function candidateSourceUrls(episode) {
  const resourceUrls = (episode.resources || [])
    .filter((resource) => resource?.type === "source" && resource.url)
    .map((resource) => resource.url);
  return [episode.youtube?.url, episode.episodeUrl, ...resourceUrls, episode.audioUrl]
    .filter(Boolean)
    .filter((url, index, array) => array.indexOf(url) === index);
}

function buildTags(podcastId) {
  return ["AI播客", "youtube.qiaomu.ai", normalizeTag(podcastId)]
    .filter(Boolean);
}

function normalizeTag(value) {
  const tag = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return tag.slice(0, 20);
}

function isCandidateRetryable(key, sourceUrls) {
  const existing = state.items[key];
  if (!existing || !retryableFailureStatuses.has(existing.taskStatus)) return true;

  const attempted = failedSourceUrls(existing);
  const hasUntriedSource = sourceUrls.some((url) => !attempted.has(url));
  if (hasUntriedSource) return true;
  if (failedCooldownMs === 0) return true;

  const lastAttemptedAt = Date.parse(existing.updatedAt || existing.createdAt || "");
  if (!Number.isFinite(lastAttemptedAt)) return true;
  return Date.now() - lastAttemptedAt >= failedCooldownMs;
}

function failedSourceUrls(existing) {
  const urls = new Set((existing?.attempts || [])
    .filter((attempt) => retryableFailureStatuses.has(attempt.status) && attempt.sourceUrl)
    .map((attempt) => attempt.sourceUrl));
  if (retryableFailureStatuses.has(existing?.taskStatus) && existing.sourceUrl) {
    urls.add(existing.sourceUrl);
  }
  return urls;
}

function sortCandidates(candidates) {
  candidates.sort((left, right) => {
    const leftState = state.items[`${left.podcast.id}/${left.episode.id}`];
    const rightState = state.items[`${right.podcast.id}/${right.episode.id}`];
    const leftNeverAttempted = !leftState?.taskId && !leftState?.noteId;
    const rightNeverAttempted = !rightState?.taskId && !rightState?.noteId;
    if (leftNeverAttempted !== rightNeverAttempted) return leftNeverAttempted ? -1 : 1;
    const leftHasPage = left.sourceUrls.some((url) => url === left.episode.episodeUrl);
    const rightHasPage = right.sourceUrls.some((url) => url === right.episode.episodeUrl);
    if (leftHasPage !== rightHasPage) return leftHasPage ? -1 : 1;
    const leftHasTranscript = Boolean(left.episode.transcript?.localPath);
    const rightHasTranscript = Boolean(right.episode.transcript?.localPath);
    if (leftHasTranscript !== rightHasTranscript) return leftHasTranscript ? 1 : -1;
    return 0;
  });
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
