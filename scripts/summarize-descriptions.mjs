import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const provider = {
  baseUrl: process.env.SUMMARY_BASE_URL || "https://api.aigocode.com/v1",
  model: process.env.SUMMARY_MODEL || "gpt-5.4-mini",
  service: process.env.SUMMARY_KEYCHAIN_SERVICE || "qiaomu-llm",
  account: process.env.SUMMARY_KEYCHAIN_ACCOUNT || "aigocode-openai"
};
const limit = Number.parseInt(process.env.DESCRIPTION_SUMMARY_LIMIT || "0", 10);
const minDescriptionChars = Number.parseInt(process.env.DESCRIPTION_SUMMARY_MIN_CHARS || "180", 10);
const retryAttempts = Number.parseInt(process.env.DESCRIPTION_SUMMARY_RETRY_ATTEMPTS || "5", 10);
const apiKey = process.env.OPENAI_API_KEY || readKeychainSecret(provider.service, provider.account);
const summaryRoot = path.join(root, "content", "summaries");
const podcasts = readJson("data/podcasts.json").podcasts;
const descriptionSummaryNote = "由 RSS 节目简介生成的中文概要，等待 Transcript 补齐后可重写。";
const candidates = collectCandidates().slice(0, limit > 0 ? limit : undefined);

if (candidates.length === 0) {
  console.log("No description summary candidates found.");
  process.exit(0);
}

let completed = 0;
for (const candidate of candidates) {
  const summaryMarkdown = await summarizeEpisode(candidate);
  const summaryPath = writeSummary(candidate, summaryMarkdown);
  candidate.episode.summary = {
    status: "ready",
    localPath: relativePath(summaryPath),
    localUrl: `/${relativePath(summaryPath)}`,
    note: descriptionSummaryNote
  };
  addResource(candidate.episode, { label: "总结笔记", url: candidate.episode.summary.localUrl, type: "summary" });
  fs.writeFileSync(candidate.episodeFile, `${JSON.stringify(candidate.episodeData, null, 2)}\n`, "utf8");
  completed += 1;
  console.log(`Summarized description ${completed}/${candidates.length}: ${candidate.podcast.id}/${candidate.episode.id}`);
}

refreshEpisodeIndex();
console.log(`Description summary generation complete: ${completed} updated.`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      if (episode.summary?.localPath) continue;
      const description = String(episode.description || "").trim();
      if (description.length < minDescriptionChars) continue;
      items.push({ podcast, episode, episodeData, episodeFile });
    }
  }
  return items;
}

async function summarizeEpisode({ podcast, episode }) {
  const body = {
    model: provider.model,
    messages: [
      {
        role: "system",
        content: [
          "你是向阳乔木的 AI 播客研究员，负责把英文播客 RSS 节目简介整理成中文学习概要。",
          "当前没有 transcript，也没有可用网页正文；只能基于标题和 RSS 简介总结，不得扩写成逐字稿级别内容。",
          "目标读者是中文 AI 产品、工程、创业和研究从业者；写作要具体、克制、信息密度高。",
          "保留关键英文专名、模型名、公司名、论文/产品名；不要编造简介之外的信息。",
          "输出 Markdown 正文，不要代码围栏，不要 JSON。",
          "结构固定为：## 一句话结论、## 这期可能值得听的原因、## 简介里的关键信息、## 适合谁听、## 后续等 Transcript 核验的问题。",
          "关键信息写 4-6 个要点，每个要点 1 段；总长度控制在 700-1200 个中文字符。"
        ].join("\n")
      },
      {
        role: "user",
        content: [
          `Podcast: ${podcast.title}`,
          `Episode: ${episode.title}`,
          episode.titleZh ? `Chinese title: ${episode.titleZh}` : "",
          episode.descriptionZh ? `Chinese description: ${episode.descriptionZh}` : "",
          `Source: ${episode.episodeUrl || episode.audioUrl || podcast.officialUrl}`,
          "",
          "RSS description:",
          episode.description
        ].filter(Boolean).join("\n")
      }
    ],
    temperature: 0.2,
    max_tokens: 2200
  };
  const data = await requestSummary(body);
  const content = cleanMarkdown(data?.choices?.[0]?.message?.content || "");
  if (content.length < 300 || !content.includes("## 简介里的关键信息")) {
    throw new Error(`Description summary result too weak for ${podcast.id}/${episode.id}: ${content.slice(0, 200)}`);
  }
  return content;
}

async function requestSummary(body) {
  const url = `${provider.baseUrl.replace(/\/$/, "")}/chat/completions`;
  let lastError = null;
  for (let attempt = 1; attempt <= retryAttempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Summary API failed ${response.status}: ${text.slice(0, 500)}`);
      }
      return JSON.parse(text);
    } catch (error) {
      lastError = error;
      if (attempt >= retryAttempts) break;
      const waitMs = Math.min(90000, 5000 * attempt * attempt);
      console.log(`Summary API attempt ${attempt}/${retryAttempts} failed: ${error.message}; retrying in ${Math.round(waitMs / 1000)}s.`);
      await sleep(waitMs);
    }
  }
  throw lastError || new Error("Summary API failed.");
}

function writeSummary({ podcast, episode }, summaryMarkdown) {
  const dir = path.join(summaryRoot, podcast.id);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${episode.id}.md`);
  const body = [
    `# ${episode.titleZh || episode.title}`,
    "",
    `- Podcast: ${podcast.title}`,
    `- Episode: ${episode.title}`,
    `- Source: ${episode.episodeUrl || episode.audioUrl || podcast.officialUrl}`,
    `- 获取时间: ${new Date().toISOString()}`,
    `- 说明: 本概要基于 RSS 节目简介，不是完整 Transcript 总结。`,
    "",
    summaryMarkdown.trim(),
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

function cleanMarkdown(value) {
  return String(value || "")
    .replace(/^```(?:markdown)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

function readKeychainSecret(service, account) {
  return execFileSync("security", ["find-generic-password", "-s", service, "-a", account, "-w"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
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
