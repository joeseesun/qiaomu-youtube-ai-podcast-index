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
const limit = Number.parseInt(process.env.SUMMARY_LIMIT || "0", 10);
const transcriptCharLimit = Number.parseInt(process.env.SUMMARY_TRANSCRIPT_CHARS || "52000", 10);
const force = process.env.SUMMARY_FORCE === "1";
const rewriteNonLocal = process.env.SUMMARY_REWRITE_NONLOCAL === "1";
const apiKey = process.env.OPENAI_API_KEY || readKeychainSecret(provider.service, provider.account);
const summaryRoot = path.join(root, "content", "summaries");
const podcasts = readJson("data/podcasts.json").podcasts;
const localSummaryNote = "由本地 Transcript 生成的中文总结。";
const requiredHeadings = [
  "## 一句话结论",
  "## 这期在讲什么",
  "## 核心要点",
  "## 对 AI 从业者的启发",
  "## 值得继续追问"
];
const candidates = collectCandidates().slice(0, limit > 0 ? limit : undefined);

if (candidates.length === 0) {
  console.log("No transcript-backed summaries need generation.");
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
    note: localSummaryNote
  };
  addResource(candidate.episode, { label: "总结笔记", url: candidate.episode.summary.localUrl, type: "summary" });
  fs.writeFileSync(candidate.episodeFile, `${JSON.stringify(candidate.episodeData, null, 2)}\n`, "utf8");
  completed += 1;
  console.log(`Summarized ${completed}/${candidates.length}: ${candidate.podcast.id}/${candidate.episode.id}`);
}

refreshEpisodeIndex();
console.log(`Transcript-backed summary generation complete: ${completed} updated.`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      if (!episode.transcript?.localPath) continue;
      const transcriptPath = path.join(root, episode.transcript.localPath);
      if (!fs.existsSync(transcriptPath)) continue;
      if (!force && episode.summary?.localPath && (!rewriteNonLocal || hasLocalTranscriptSummary(episode))) {
        continue;
      }
      items.push({ podcast, episode, episodeData, episodeFile, transcriptPath });
    }
  }
  return items;
}

function hasLocalTranscriptSummary(episode) {
  if (episode.summary?.note !== localSummaryNote) return false;
  if (!episode.summary?.localPath) return false;
  const summaryPath = path.join(root, episode.summary.localPath);
  if (!fs.existsSync(summaryPath)) return false;
  const markdown = fs.readFileSync(summaryPath, "utf8");
  return requiredHeadings.every((heading) => markdown.includes(heading));
}

async function summarizeEpisode({ podcast, episode, transcriptPath }) {
  const transcript = prepareTranscript(fs.readFileSync(transcriptPath, "utf8"));
  const body = {
    model: provider.model,
    messages: [
      {
        role: "system",
        content: [
          "你是向阳乔木的 AI 播客研究员，负责把英文播客 transcript 整理成高质量中文学习笔记。",
          "目标读者是中文 AI 产品、工程、创业和研究从业者；写作要具体、克制、信息密度高。",
          "不要写泛泛的节目介绍，不要编造 transcript 之外的信息，不要输出英文原文大段翻译。",
          "保留关键英文专名、模型名、公司名、论文/产品名；数字、时间、专有名词要准确。",
          "输出 Markdown 正文，不要代码围栏，不要 JSON。",
          "结构固定为：## 一句话结论、## 这期在讲什么、## 核心要点、## 对 AI 从业者的启发、## 值得继续追问。",
          "核心要点写 4-6 个三级标题，每个标题下 1-2 段解释；总长度控制在 1200-2200 个中文字符。"
        ].join("\n")
      },
      {
        role: "user",
        content: [
          `Podcast: ${podcast.title}`,
          `Episode: ${episode.title}`,
          episode.description ? `Episode description: ${episode.description}` : "",
          "",
          "Transcript:",
          transcript.slice(0, transcriptCharLimit)
        ].filter(Boolean).join("\n")
      }
    ],
    temperature: 0.25,
    max_tokens: 3600
  };
  const response = await fetch(`${provider.baseUrl.replace(/\/$/, "")}/chat/completions`, {
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
  const data = JSON.parse(text);
  const content = cleanMarkdown(data?.choices?.[0]?.message?.content || "");
  if (content.length < 400 || !content.includes("## 核心要点")) {
    throw new Error(`Summary result too weak for ${podcast.id}/${episode.id}: ${content.slice(0, 200)}`);
  }
  return content;
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
    "",
    summaryMarkdown.trim(),
    ""
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
}

function prepareTranscript(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/^# .+$/m, "")
    .replace(/^- (Podcast|Published|Source|Transcript type): .+$/gm, "")
    .replace(/^## Transcript\s*/m, "")
    .replace(/<v ([^>]+)>/g, "\n$1: ")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanMarkdown(value) {
  return String(value || "")
    .replace(/^```(?:markdown)?/i, "")
    .replace(/```$/i, "")
    .trim();
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
