import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const batchSize = positiveInt(process.env.GETNOTE_AUTOFILL_BATCH_SIZE, 1);
const maxCycles = positiveInt(process.env.GETNOTE_AUTOFILL_MAX_CYCLES, 0);
const cyclePauseSeconds = positiveInt(process.env.GETNOTE_AUTOFILL_CYCLE_PAUSE_SECONDS, 300);
const quotaPauseSeconds = positiveInt(process.env.GETNOTE_AUTOFILL_QUOTA_PAUSE_SECONDS, 21600);
const createPauseSeconds = positiveInt(process.env.GETNOTE_CREATE_PAUSE_SECONDS, 240);
const pollSeconds = positiveInt(process.env.GETNOTE_POLL_SECONDS, 30);
const maxPolls = positiveInt(process.env.GETNOTE_MAX_POLLS, 40);
const maxConsecutiveFailures = positiveInt(process.env.GETNOTE_AUTOFILL_MAX_FAILURES, 3);
const summaryRetryAttempts = positiveInt(process.env.GETNOTE_SUMMARY_RETRY_ATTEMPTS, 3);
const summaryRetryPauseSeconds = positiveInt(process.env.GETNOTE_SUMMARY_RETRY_PAUSE_SECONDS, 90);
const importYoutubeCaptionsBeforeSync = process.env.GETNOTE_AUTOFILL_IMPORT_YOUTUBE_CAPTIONS !== "0";
const discoverExistingBeforeSync = process.env.GETNOTE_AUTOFILL_DISCOVER_EXISTING !== "0";
const refreshExistingBeforeSync = process.env.GETNOTE_AUTOFILL_REFRESH_EXISTING !== "0";
const deployAfterBuild = process.env.GETNOTE_AUTOFILL_DEPLOY === "1";
const summarizeAfterSync = process.env.GETNOTE_AUTOFILL_SUMMARIZE !== "0";
const dryRun = process.env.GETNOTE_AUTOFILL_DRY_RUN === "1";
const progressPath = path.join(root, "data", "getnote-autofill-state.json");
const syncStatePath = path.join(root, "data", "getnote-sync.json");
const quotaExitCode = 75;

let cycle = 0;
let consecutiveFailures = 0;

while (true) {
  const before = scanMissing();
  writeProgress({
    status: dryRun ? "dry-run" : "running",
    cycle,
    ...before
  });
  logStatus("before", before);

  if (before.missingTranscripts === 0 && before.missingSummaries === 0) {
    writeProgress({ status: "complete", cycle, ...before });
    console.log("All transcript and summary artifacts are complete.");
    process.exit(0);
  }

  if (dryRun) {
    process.exit(0);
  }

  if (maxCycles > 0 && cycle >= maxCycles) {
    writeProgress({ status: "max-cycles-reached", cycle, ...before });
    console.log(`Reached GETNOTE_AUTOFILL_MAX_CYCLES=${maxCycles}.`);
    process.exit(0);
  }

  cycle += 1;
  if (importYoutubeCaptionsBeforeSync) await runYoutubeCaptionImport();
  if (discoverExistingBeforeSync) await runDiscoverExisting();
  if (refreshExistingBeforeSync) await runRefreshExisting();
  const result = await runSyncBatch();
  if (result === quotaExitCode) {
    consecutiveFailures = 0;
    const quota = readQuotaMarker();
    const pauseMs = quotaPauseMilliseconds(quota);
    writeProgress({
      status: "quota-paused",
      cycle,
      quotaPauseSeconds: Math.round(pauseMs / 1000),
      quotaResetAt: quota?.resetAt || null,
      quotaResetAtIso: quota?.resetAt ? new Date(Number(quota.resetAt) * 1000).toISOString() : null,
      ...scanMissing()
    });
    console.log(`Note service daily write quota is exhausted; sleeping ${Math.round(pauseMs / 1000)}s before retrying.`);
    await sleep(pauseMs);
    continue;
  }

  if (result !== 0) {
    consecutiveFailures += 1;
    writeProgress({ status: "batch-failed", cycle, exitCode: result, consecutiveFailures, ...scanMissing() });
    if (consecutiveFailures >= maxConsecutiveFailures) {
      console.error(`Stopping after ${consecutiveFailures} consecutive failed batch(es).`);
      process.exit(result || 1);
    }
  } else {
    consecutiveFailures = 0;
    if (summarizeAfterSync) await runSummaries();
    await runBuild();
    if (deployAfterBuild) await runDeploy();
    const after = scanMissing();
    writeProgress({ status: "batch-complete", cycle, consecutiveFailures, ...after });
    logStatus("after", after);
  }

  const next = scanMissing();
  if (next.missingTranscripts === 0 && next.missingSummaries === 0) {
    writeProgress({ status: "complete", cycle, ...next });
    console.log("All transcript and summary artifacts are complete.");
    process.exit(0);
  }

  console.log(`Sleeping ${cyclePauseSeconds}s before the next autofill cycle.`);
  await sleep(cyclePauseSeconds * 1000);
}

function scanMissing() {
  const podcastData = readJson("data/podcasts.json");
  const syncState = fs.existsSync(syncStatePath) ? JSON.parse(fs.readFileSync(syncStatePath, "utf8")) : { items: {} };
  const missing = [];
  let episodes = 0;
  let transcripts = 0;
  let summaries = 0;

  for (const podcast of podcastData.podcasts || []) {
    const episodePath = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodePath)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodePath, "utf8"));
    for (const episode of episodeData.episodes || []) {
      episodes += 1;
      const hasTranscript = Boolean(episode.transcript?.localPath);
      const hasSummary = Boolean(episode.summary?.localPath);
      if (hasTranscript) transcripts += 1;
      if (hasSummary) summaries += 1;
      if (!hasTranscript || !hasSummary) {
        missing.push({
          podcastId: podcast.id,
          episodeId: episode.id,
          needsTranscript: !hasTranscript,
          needsSummary: !hasSummary,
          priority: missingPriority(podcast, episode, syncState)
        });
      }
    }
  }
  missing.sort((left, right) => left.priority - right.priority);

  return {
    generatedAt: new Date().toISOString(),
    episodes,
    transcripts,
    summaries,
    missingTranscripts: episodes - transcripts,
    missingSummaries: episodes - summaries,
    missingItems: missing.length,
    nextItems: missing.slice(0, 10).map(({ priority, ...item }) => item)
  };
}

async function runSyncBatch() {
  return runCommand(process.execPath, [path.join(root, "scripts", "getnote-sync.mjs")], {
    ...process.env,
    GETNOTE_LIMIT: String(batchSize),
    GETNOTE_CREATE_PAUSE_SECONDS: String(createPauseSeconds),
    GETNOTE_POLL_SECONDS: String(pollSeconds),
    GETNOTE_MAX_POLLS: String(maxPolls)
  });
}

async function runYoutubeCaptionImport() {
  const exitCode = await runCommand(process.execPath, [path.join(root, "scripts", "import-youtube-captions.mjs")], {
    ...process.env,
    YOUTUBE_CAPTION_UNAVAILABLE_COOLDOWN_HOURS: process.env.YOUTUBE_CAPTION_UNAVAILABLE_COOLDOWN_HOURS || "24"
  });
  if (exitCode !== 0) {
    console.error(`YouTube caption import failed with exit code ${exitCode}; continuing to existing note refresh.`);
  }
}

async function runDiscoverExisting() {
  const exitCode = await runCommand(process.execPath, [path.join(root, "scripts", "getnote-discover-existing.mjs")], {
    ...process.env,
    GETNOTE_DISCOVER_PAGES: process.env.GETNOTE_DISCOVER_PAGES || "12",
    GETNOTE_DISCOVER_PAUSE_SECONDS: process.env.GETNOTE_DISCOVER_PAUSE_SECONDS || "4"
  });
  if (exitCode !== 0) {
    console.error(`Existing note discovery failed with exit code ${exitCode}; continuing to existing note refresh.`);
  }
}

async function runRefreshExisting() {
  const exitCode = await runCommand(process.execPath, [path.join(root, "scripts", "getnote-refresh-existing.mjs")], {
    ...process.env,
    GETNOTE_REFRESH_LIMIT: process.env.GETNOTE_REFRESH_LIMIT || "12",
    GETNOTE_REFRESH_PAUSE_SECONDS: process.env.GETNOTE_REFRESH_PAUSE_SECONDS || "15"
  });
  if (exitCode !== 0) {
    console.error(`Existing note refresh failed with exit code ${exitCode}; continuing to sync batch.`);
  }
}

async function runBuild() {
  const exitCode = await runCommand(process.execPath, [path.join(root, "scripts", "build-site.mjs")], process.env);
  if (exitCode !== 0) {
    throw new Error(`Build failed after autofill batch with exit code ${exitCode}.`);
  }
}

async function runSummaries() {
  for (let attempt = 1; attempt <= summaryRetryAttempts; attempt += 1) {
    const exitCode = await runCommand(process.execPath, [path.join(root, "scripts", "summarize-transcripts.mjs")], {
      ...process.env,
      SUMMARY_REWRITE_NONLOCAL: "1"
    });
    if (exitCode === 0) return;
    if (attempt < summaryRetryAttempts) {
      console.error(`Summary generation failed with exit code ${exitCode}; retrying in ${summaryRetryPauseSeconds}s (${attempt}/${summaryRetryAttempts}).`);
      await sleep(summaryRetryPauseSeconds * 1000);
      continue;
    }
    throw new Error(`Summary generation failed after ${summaryRetryAttempts} attempt(s), last exit code ${exitCode}.`);
  }
}

async function runDeploy() {
  const exitCode = await runCommand(process.execPath, [path.join(root, "scripts", "deploy-static.mjs")], process.env);
  if (exitCode !== 0) {
    throw new Error(`Deploy failed after autofill batch with exit code ${exitCode}.`);
  }
}

function runCommand(command, args, env) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: "/",
      env: { ...env, YOUTUBE_SITE_ROOT: root },
      stdio: "inherit"
    });
    child.on("close", (code) => resolve(code || 0));
    child.on("error", (error) => {
      console.error(error);
      resolve(1);
    });
  });
}

function quotaPauseMilliseconds(quota = readQuotaMarker()) {
  if (quota) {
    const resetAtMs = Number(quota.resetAt || 0) * 1000;
    if (resetAtMs > Date.now()) {
      return Math.max(60 * 1000, resetAtMs - Date.now() + 60 * 1000);
    }
  }
  return quotaPauseSeconds * 1000;
}

function readQuotaMarker() {
  const quotaPath = path.join(root, "data", "getnote-quota.json");
  if (fs.existsSync(quotaPath)) {
    try {
      return JSON.parse(fs.readFileSync(quotaPath, "utf8"));
    } catch {
      // Fall back to the configured pause when the quota marker is malformed.
    }
  }
  return null;
}

function missingPriority(podcast, episode, syncState) {
  const state = syncState.items?.[`${podcast.id}/${episode.id}`];
  const neverAttempted = !state?.taskId && !state?.noteId;
  const hasEpisodePage = candidateSourceUrls(episode).some((url) => url === episode.episodeUrl);
  const hasTranscript = Boolean(episode.transcript?.localPath);
  return [
    neverAttempted ? 0 : 1,
    hasEpisodePage ? 0 : 1,
    hasTranscript ? 1 : 0
  ].reduce((score, value, index) => score + value * Math.pow(10, 2 - index), 0);
}

function candidateSourceUrls(episode) {
  const resourceUrls = (episode.resources || [])
    .filter((resource) => resource?.type === "source" && resource.url)
    .map((resource) => resource.url);
  return [episode.youtube?.url, episode.episodeUrl, ...resourceUrls, episode.audioUrl]
    .filter(Boolean)
    .filter((url, index, array) => array.indexOf(url) === index);
}

function writeProgress(payload) {
  fs.mkdirSync(path.dirname(progressPath), { recursive: true });
  fs.writeFileSync(progressPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function logStatus(label, status) {
  console.log(`${label}: ${status.episodes} episodes, ${status.transcripts} transcripts, ${status.summaries} summaries; missing transcripts=${status.missingTranscripts}, summaries=${status.missingSummaries}`);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function positiveInt(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
