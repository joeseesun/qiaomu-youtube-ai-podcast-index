import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const dataPath = path.join(root, "data", "podcasts.json");
const requiredPodcastFields = [
  "id",
  "title",
  "hosts",
  "language",
  "cadence",
  "category",
  "audiences",
  "tags",
  "summary",
  "why",
  "youtubeUrl",
  "officialUrl",
  "appleUrl",
  "rssUrl",
  "artworkUrl",
  "sourceUrls"
];

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const errors = [];

if (!data.metadata || !data.metadata.updatedAt) {
  errors.push("metadata.updatedAt is required");
}

if (Number.isNaN(Date.parse(data.metadata?.updatedAt))) {
  errors.push("metadata.updatedAt must be a valid date");
}

if (!Array.isArray(data.metadata?.categories) || data.metadata.categories.length === 0) {
  errors.push("metadata.categories must be a non-empty array");
}

if (!Array.isArray(data.metadata?.audiences) || data.metadata.audiences.length === 0) {
  errors.push("metadata.audiences must be a non-empty array");
}

if (!Array.isArray(data.podcasts) || data.podcasts.length === 0) {
  errors.push("podcasts must be a non-empty array");
}

const ids = new Set();
for (const [index, podcast] of (data.podcasts || []).entries()) {
  const label = podcast?.id || `podcast at index ${index}`;
  for (const field of requiredPodcastFields) {
    if (podcast[field] === undefined || podcast[field] === "") {
      errors.push(`${label}: missing ${field}`);
    }
  }
  if (ids.has(podcast.id)) {
    errors.push(`${label}: duplicate id`);
  }
  ids.add(podcast.id);

  if (!data.metadata.categories.includes(podcast.category)) {
    errors.push(`${label}: category is not in metadata.categories`);
  }
  if (!Array.isArray(podcast.audiences) || podcast.audiences.some((audience) => !data.metadata.audiences.includes(audience))) {
    errors.push(`${label}: audiences must all exist in metadata.audiences`);
  }
  for (const field of ["youtubeUrl", "officialUrl", "appleUrl", "rssUrl", "artworkUrl"]) {
    validateUrl(`${label}.${field}`, podcast[field]);
  }
  if (!/youtube\.com|youtu\.be/.test(new URL(podcast.youtubeUrl).hostname)) {
    errors.push(`${label}: youtubeUrl must point to YouTube`);
  }
  if (!Array.isArray(podcast.tags) || podcast.tags.length < 3) {
    errors.push(`${label}: tags must include at least 3 items`);
  }
  if (!Array.isArray(podcast.sourceUrls) || podcast.sourceUrls.length === 0) {
    errors.push(`${label}: sourceUrls must be a non-empty array`);
  } else {
    podcast.sourceUrls.forEach((url, sourceIndex) => validateUrl(`${label}.sourceUrls[${sourceIndex}]`, url));
  }
  validatePodcastArtifacts(podcast);
}

for (const asset of ["public/qiaomu/reward-qr.png", "public/qiaomu/wechat-public-account-qr.jpg"]) {
  if (!fs.existsSync(path.join(root, asset))) {
    errors.push(`missing Qiaomu asset: ${asset}`);
  }
}

validateNoPublicSourceLeak();

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

const episodeIndexPath = path.join(root, "data", "episodes-index.json");
const episodeSummary = fs.existsSync(episodeIndexPath)
  ? JSON.parse(fs.readFileSync(episodeIndexPath, "utf8")).podcasts.reduce((total, item) => ({
    episodes: total.episodes + item.episodeCount,
    transcripts: total.transcripts + item.transcriptCount,
    summaries: total.summaries + (item.summaryCount || 0)
  }), { episodes: 0, transcripts: 0, summaries: 0 })
  : { episodes: 0, transcripts: 0, summaries: 0 };
const summaryQuality = summarizeSummaryQuality();

console.log(`Validated ${data.podcasts.length} podcasts, ${data.metadata.categories.length} categories, ${data.metadata.audiences.length} audiences, ${episodeSummary.episodes} episodes, ${episodeSummary.transcripts} transcripts, ${episodeSummary.summaries} summaries (${summaryQuality.transcriptBacked} transcript-backed, ${summaryQuality.fallback} fallback).`);

function validateUrl(label, value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) {
      errors.push(`${label}: URL must use http or https`);
    }
  } catch {
    errors.push(`${label}: invalid URL`);
  }
}

function validatePodcastArtifacts(podcast) {
  const detailsPath = path.join(root, "podcasts", podcast.id, "index.html");
  if (fs.existsSync(path.join(root, "podcasts")) && !fs.existsSync(detailsPath)) {
    errors.push(`${podcast.id}: missing detail page ${path.relative(root, detailsPath)}`);
  }

  const episodePath = path.join(root, "data", "episodes", `${podcast.id}.json`);
  if (!fs.existsSync(episodePath)) {
    return;
  }

  const episodeData = JSON.parse(fs.readFileSync(episodePath, "utf8"));
  if (!Array.isArray(episodeData.episodes) || episodeData.episodes.length === 0) {
    errors.push(`${podcast.id}: episode file has no episodes`);
    return;
  }

  for (const episode of episodeData.episodes) {
    const label = `${podcast.id}/${episode.id}`;
    if (!episode.title) errors.push(`${label}: missing episode title`);
    if (!episode.titleZh) errors.push(`${label}: missing Chinese episode title titleZh`);
    if (!episode.descriptionZh) errors.push(`${label}: missing Chinese episode description descriptionZh`);
    if (!episode.episodeUrl && !episode.audioUrl) errors.push(`${label}: missing episodeUrl and audioUrl`);
    if (episode.audioUrl) validateUrl(`${label}.audioUrl`, episode.audioUrl);
    if (episode.episodeUrl) validateUrl(`${label}.episodeUrl`, episode.episodeUrl);
    for (const resource of episode.resources || []) {
      if (!resource.label || !resource.url || !resource.type) errors.push(`${label}: invalid resource`);
    }
    for (const key of ["transcript", "summary"]) {
      const artifact = episode[key];
      if (artifact?.localPath && !fs.existsSync(path.join(root, artifact.localPath))) {
        errors.push(`${label}: missing ${key} file ${artifact.localPath}`);
      }
      if (artifact?.localPath && fs.existsSync(path.join(root, "content"))) {
        const htmlPath = artifact.localPath.replace(/\.md$/, ".html");
        if (!fs.existsSync(path.join(root, htmlPath))) {
          errors.push(`${label}: missing ${key} html page ${htmlPath}`);
        }
      }
      if (artifact?.localUrl && !artifact.localUrl.startsWith("/")) {
        errors.push(`${label}: ${key}.localUrl must be root-relative`);
      }
    }
  }
}

function validateNoPublicSourceLeak() {
  const publicPaths = [
    "index.html",
    "app.js",
    "styles.css",
    "data/podcasts.json",
    "data/episodes-index.json",
    "data/episodes",
    "content",
    "podcasts"
  ];
  for (const publicPath of publicPaths) {
    const absolute = path.join(root, publicPath);
    if (!fs.existsSync(absolute)) continue;
    for (const file of listTextFiles(absolute)) {
      const text = fs.readFileSync(file, "utf8");
      if (text.includes("Get笔记")) {
        errors.push(`public source leak: ${path.relative(root, file)}`);
      }
    }
  }
}

function summarizeSummaryQuality() {
  let transcriptBacked = 0;
  let fallback = 0;
  for (const podcast of data.podcasts || []) {
    const episodePath = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodePath)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodePath, "utf8"));
    for (const episode of episodeData.episodes || []) {
      if (!episode.summary?.localPath) continue;
      if (episode.transcript?.localPath) transcriptBacked += 1;
      else fallback += 1;
    }
  }
  return { transcriptBacked, fallback };
}

function listTextFiles(absolute) {
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  const files = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const full = path.join(absolute, entry.name);
    if (entry.isDirectory()) {
      files.push(...listTextFiles(full));
    } else if (/\.(html|js|css|json|md|txt)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}
