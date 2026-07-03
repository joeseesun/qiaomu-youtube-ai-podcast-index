import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const limit = Number.parseInt(process.env.YOUTUBE_SOURCE_VIDEO_LIMIT || "15", 10);
const minScore = Number.parseFloat(process.env.YOUTUBE_SOURCE_MIN_SCORE || "0.42");
const searchFallback = process.env.YOUTUBE_SOURCE_SEARCH === "1";
const pageEmbeds = process.env.YOUTUBE_SOURCE_PAGE_EMBEDS === "1";
const dryRun = process.env.YOUTUBE_SOURCE_DRY_RUN === "1";
const podcasts = readJson("data/podcasts.json").podcasts;
const targetIds = new Set((process.env.YOUTUBE_SOURCE_PODCASTS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean));

let updated = 0;
for (const podcast of podcasts) {
  if (targetIds.size && !targetIds.has(podcast.id)) continue;
  if (!podcast.youtubeUrl) continue;
  const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
  if (!fs.existsSync(episodeFile)) continue;
  const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
  const missing = (episodeData.episodes || []).filter((episode) => !episode.transcript?.localPath);
  if (missing.length === 0) continue;

  const videos = await fetchYoutubeVideos(podcast.youtubeUrl);
  if (videos.length === 0) {
    console.log(`${podcast.id}: no YouTube videos discovered.`);
  }

  let changed = false;
  for (const [index, episode] of missing.entries()) {
    const existingYoutubeUrl = episode.youtube?.url || (/youtube\.com|youtu\.be/.test(episode.episodeUrl || "") ? episode.episodeUrl : "");
    if (existingYoutubeUrl) {
      episode.youtube = {
        ...episode.youtube,
        url: existingYoutubeUrl
      };
      addResource(episode, { label: "YouTube", url: existingYoutubeUrl, type: "source" });
      changed = true;
      continue;
    }
    let ranked = videos
      .map((video, videoIndex) => ({
        video,
        videoIndex,
        score: titleScore(episode.title, video.title)
      }))
      .sort((left, right) => right.score - left.score);
    const best = ranked[0];
    const sameOrder = index < videos.length && titleScore(episode.title, videos[index].title) >= Math.max(0.22, minScore - 0.1);
    let picked = best?.score >= minScore ? best.video : (sameOrder ? videos[index] : null);
    let pickedScore = picked ? titleScore(episode.title, picked.title) : 0;
    if (!picked && pageEmbeds && episode.episodeUrl && !/youtube\.com|youtu\.be/.test(episode.episodeUrl)) {
      const pageVideos = await fetchPageYoutubeVideos(episode.episodeUrl);
      if (pageVideos.length > 0) {
        ranked = pageVideos
          .map((video, videoIndex) => ({
            video: { ...video, source: "episode-page-embed" },
            videoIndex,
            score: Math.max(titleScore(episode.title, video.title), 0.001)
          }))
          .sort((left, right) => right.score - left.score);
        picked = ranked[0].video;
        pickedScore = ranked[0].score;
      }
    }
    if (!picked && searchFallback) {
      const searchVideos = await searchYoutubeVideos(`${episode.title} ${podcast.title}`);
      ranked = searchVideos
        .map((video, videoIndex) => ({
          video,
          videoIndex,
          score: titleScore(episode.title, video.title)
        }))
        .sort((left, right) => right.score - left.score);
      if (ranked[0]?.score >= minScore) {
        picked = ranked[0].video;
        pickedScore = ranked[0].score;
      }
    }
    if (!picked) {
      const candidate = ranked[0] || best;
      console.log(`${podcast.id}/${episode.id}: no confident YouTube match; best=${candidate?.score.toFixed(2) || "0"} ${candidate?.video.title || ""}`);
      continue;
    }
    const youtubeUrl = `https://www.youtube.com/watch?v=${picked.id}`;
    if (!episode.episodeUrl) {
      episode.episodeUrl = youtubeUrl;
    }
    episode.youtube = {
      videoId: picked.id,
      title: picked.title,
      url: youtubeUrl,
      source: picked.source || "youtube-discovery",
      matchedAt: new Date().toISOString(),
      matchScore: Number(pickedScore.toFixed(3))
    };
    addResource(episode, { label: "YouTube", url: youtubeUrl, type: "source" });
    changed = true;
    updated += 1;
    console.log(`${podcast.id}/${episode.id}: matched YouTube ${picked.id} score=${episode.youtube.matchScore} title=${picked.title}`);
  }

  if (changed && !dryRun) {
    fs.writeFileSync(episodeFile, `${JSON.stringify(episodeData, null, 2)}\n`, "utf8");
  }
}

console.log(`${dryRun ? "Would update" : "Updated"} ${updated} episode YouTube source(s).`);

async function fetchYoutubeVideos(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 QiaomuAIIndex/0.2"
    }
  });
  if (!response.ok) throw new Error(`YouTube page fetch failed ${response.status}: ${url}`);
  const html = await response.text();
  const ids = [...new Set([...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((match) => match[1]))].slice(0, limit);
  const videos = [];
  for (const id of ids) {
    const title = await fetchYoutubeTitle(id);
    if (title) videos.push({ id, title });
  }
  return videos;
}

async function searchYoutubeVideos(query) {
  const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 QiaomuAIIndex/0.2"
    }
  });
  if (!response.ok) return [];
  const html = await response.text();
  const ids = [...new Set([...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((match) => match[1]))].slice(0, limit);
  const videos = [];
  for (const id of ids) {
    const title = await fetchYoutubeTitle(id);
    if (title) videos.push({ id, title });
  }
  return videos;
}

async function fetchPageYoutubeVideos(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 QiaomuAIIndex/0.2"
    }
  });
  if (!response.ok) return [];
  const html = await response.text();
  const ids = [...new Set([...html.matchAll(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/g)].map((match) => match[1]))].slice(0, limit);
  const videos = [];
  for (const id of ids) {
    const title = await fetchYoutubeTitle(id);
    if (title) videos.push({ id, title });
  }
  return videos;
}

async function fetchYoutubeTitle(id) {
  const response = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 QiaomuAIIndex/0.2"
    }
  });
  if (!response.ok) return "";
  const data = await response.json().catch(() => null);
  return cleanTitle(data?.title || "");
}

function titleScore(left, right) {
  const leftTokens = titleTokens(left);
  const rightTokens = titleTokens(right);
  if (leftTokens.size === 0 || rightTokens.size === 0) return 0;
  let intersection = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) intersection += 1;
  }
  return intersection / Math.min(leftTokens.size, rightTokens.size);
}

function titleTokens(value) {
  const stop = new Set(["the", "and", "with", "for", "from", "that", "this", "into", "will", "how", "why", "ai", "podcast", "episode", "ep"]);
  return new Set(String(value || "")
    .toLowerCase()
    .replace(/&amp;/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stop.has(token)));
}

function cleanTitle(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function addResource(episode, resource) {
  episode.resources = Array.isArray(episode.resources) ? episode.resources : [];
  if (!episode.resources.some((item) => item.type === resource.type && item.url === resource.url)) {
    episode.resources.push(resource);
  }
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
}
