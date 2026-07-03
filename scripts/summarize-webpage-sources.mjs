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
const limit = Number.parseInt(process.env.WEBPAGE_SUMMARY_LIMIT || "0", 10);
const sourceCharLimit = Number.parseInt(process.env.WEBPAGE_SUMMARY_SOURCE_CHARS || "48000", 10);
const apiKey = process.env.OPENAI_API_KEY || readKeychainSecret(provider.service, provider.account);
const summaryRoot = path.join(root, "content", "summaries");
const articleRoot = path.join(root, "content", "articles");
const podcasts = readJson("data/podcasts.json").podcasts;
const webpageSummaryNote = "由原始页面正文生成的中文总结。";
const candidates = collectCandidates().slice(0, limit > 0 ? limit : undefined);

if (candidates.length === 0) {
  console.log("No webpage summary candidates found.");
  process.exit(0);
}

let completed = 0;
for (const candidate of candidates) {
  const page = await fetchReadablePage(candidate.episode.episodeUrl);
  if (page.text.length < 1200) {
    console.log(`${candidate.podcast.id}/${candidate.episode.id}: webpage text too short; skipped.`);
    continue;
  }
  const summaryMarkdown = await summarizeEpisode(candidate, page.text);
  const articlePath = writeArticle(candidate, page.text);
  const summaryPath = writeSummary(candidate, summaryMarkdown);
  candidate.episode.article = {
    status: "ready",
    localPath: relativePath(articlePath),
    localUrl: `/${relativePath(articlePath)}`,
    note: "Saved from original webpage body."
  };
  candidate.episode.summary = {
    status: "ready",
    localPath: relativePath(summaryPath),
    localUrl: `/${relativePath(summaryPath)}`,
    note: webpageSummaryNote
  };
  addResource(candidate.episode, { label: "原文正文", url: candidate.episode.article.localUrl, type: "article" });
  addResource(candidate.episode, { label: "总结笔记", url: candidate.episode.summary.localUrl, type: "summary" });
  fs.writeFileSync(candidate.episodeFile, `${JSON.stringify(candidate.episodeData, null, 2)}\n`, "utf8");
  completed += 1;
  console.log(`Summarized webpage ${completed}/${candidates.length}: ${candidate.podcast.id}/${candidate.episode.id}`);
}

refreshEpisodeIndex();
console.log(`Webpage summary generation complete: ${completed} updated.`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
    for (const episode of episodeData.episodes || []) {
      if (episode.summary?.localPath || !episode.episodeUrl) continue;
      items.push({ podcast, episode, episodeData, episodeFile });
    }
  }
  return items;
}

async function fetchReadablePage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "QiaomuAIIndex/0.2 (+https://youtube.qiaomu.ai)"
    }
  });
  if (!response.ok) throw new Error(`Webpage fetch failed ${response.status}: ${url}`);
  const html = await response.text();
  return { text: readableTextFromHtml(html) };
}

async function summarizeEpisode({ podcast, episode }, sourceText) {
  const body = {
    model: provider.model,
    messages: [
      {
        role: "system",
        content: [
          "你是向阳乔木的 AI 播客研究员，负责把英文播客网页正文整理成高质量中文学习笔记。",
          "这不是 transcript 时不要声称它是逐字稿；只基于网页正文和节目介绍总结。",
          "目标读者是中文 AI 产品、工程、创业和研究从业者；写作要具体、克制、信息密度高。",
          "保留关键英文专名、模型名、公司名、论文/产品名；不要编造正文之外的信息。",
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
          `Source URL: ${episode.episodeUrl}`,
          "",
          "Webpage body:",
          sourceText.slice(0, sourceCharLimit)
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
    throw new Error(`Summary result too weak: ${content.slice(0, 200)}`);
  }
  return content;
}

function writeArticle({ podcast, episode }, text) {
  const dir = path.join(articleRoot, podcast.id);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${episode.id}.md`);
  const body = [
    `# ${episode.title}`,
    "",
    `- Podcast: ${podcast.title}`,
    `- Source: ${episode.episodeUrl}`,
    `- 获取时间: ${new Date().toISOString()}`,
    "",
    "## 原始页面正文",
    "",
    text.trim(),
    ""
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
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
    `- Source: ${episode.episodeUrl}`,
    `- 获取时间: ${new Date().toISOString()}`,
    `- 说明: 本总结基于原始网页正文，不是逐字 Transcript。`,
    "",
    summaryMarkdown.trim(),
    ""
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
}

function readableTextFromHtml(html) {
  const article = matchFirst(html, /<div[^>]+class="[^"]*\bavailable-content\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i)
    || matchFirst(html, /<article[^>]*>([\s\S]*?)<\/article>/i)
    || matchFirst(html, /<main[^>]*>([\s\S]*?)<\/main>/i)
    || html;
  return htmlText(article)
    .replace(/Generate transcript[\s\S]*?A transcript unlocks clips, previews, and editing\./gi, "")
    .replace(/\bShare\b/g, " ")
    .trim();
}

function htmlText(value) {
  return decodeHtml(String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&mdash;/g, "-")
    .replace(/&ndash;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function matchFirst(value, regex) {
  const match = String(value || "").match(regex);
  return match ? match[1] : "";
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
