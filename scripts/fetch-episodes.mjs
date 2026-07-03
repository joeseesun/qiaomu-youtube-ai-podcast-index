import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

const root = process.cwd();
const limit = Number.parseInt(process.env.EPISODE_LIMIT || "5", 10);
const data = readJson("data/podcasts.json");
const episodesDir = path.join(root, "data", "episodes");
const transcriptRoot = path.join(root, "content", "transcripts");
const articleRoot = path.join(root, "content", "articles");
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: "#cdata",
  parseTagValue: false,
  trimValues: true
});

fs.mkdirSync(episodesDir, { recursive: true });
fs.mkdirSync(transcriptRoot, { recursive: true });
fs.mkdirSync(articleRoot, { recursive: true });

const index = {
  generatedAt: new Date().toISOString(),
  limit,
  podcasts: []
};

for (const podcast of data.podcasts) {
  let result = await fetchPodcastEpisodes(podcast);
  if (result.error && result.episodes.length === 0) {
    const previous = previousEpisodesFor(podcast.id);
    const localArtifacts = fallbackEpisodesFromLocalArtifacts(podcast);
    const fallback = previous.length ? previous : localArtifacts;
    if (fallback.length) {
      result = {
        episodes: fallback,
        error: `${result.error}; preserved ${previous.length ? "previous snapshot" : "local transcript/article artifacts"}`
      };
    }
  }
  index.podcasts.push({
    id: podcast.id,
    title: podcast.title,
    episodeCount: result.episodes.length,
    transcriptCount: result.episodes.filter((episode) => episode.transcript?.localPath).length,
    articleCount: result.episodes.filter((episode) => episode.article?.localPath).length,
    summaryCount: result.episodes.filter((episode) => episode.summary?.localPath).length,
    error: result.error || null
  });
  writeJson(path.join("data", "episodes", `${podcast.id}.json`), {
    podcastId: podcast.id,
    podcastTitle: podcast.title,
    fetchedAt: new Date().toISOString(),
    sourceRss: podcast.rssUrl,
    episodes: result.episodes
  });
  console.log(`${podcast.id}: ${result.episodes.length} episodes${result.error ? ` (${result.error})` : ""}`);
}

writeJson("data/episodes-index.json", index);
console.log(`Wrote ${index.podcasts.length} podcast episode files.`);

async function fetchPodcastEpisodes(podcast) {
  try {
    if (podcast.id === "high-agency") {
      return await fetchHighAgencyEpisodes(podcast);
    }
    const rss = await fetchText(podcast.rssUrl);
    const parsed = parser.parse(rss);
    const channel = parsed?.rss?.channel || parsed?.feed || {};
    const rawItems = asArray(channel.item || channel.entry).slice(0, limit);
    const previousById = new Map(previousEpisodesFor(podcast.id).map((episode) => [episode.id, episode]));
    const episodes = [];
    for (const item of rawItems) {
      const episode = normalizeEpisode(podcast, item);
      await attachTranscriptAndArticle(podcast, episode);
      mergeExistingArtifacts(episode, previousById.get(episode.id));
      episodes.push(episode);
    }
    return { episodes };
  } catch (error) {
    return { episodes: [], error: error.message };
  }
}

async function fetchHighAgencyEpisodes(podcast) {
  const html = await fetchText(podcast.officialUrl);
  const links = [...html.matchAll(/href="([^"]+)"[^>]*>Show highlights and transcript/g)]
    .map((match) => absoluteUrl(match[1], "https://humanloop.com"))
    .filter((url, index, array) => array.indexOf(url) === index)
    .slice(0, limit);
  const episodes = [];
  for (const url of links) {
    const episodeHtml = await fetchText(url);
    const title = htmlText(matchFirst(episodeHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/i)) || titleFromUrl(url);
    const description = htmlText(matchFirst(episodeHtml, /<meta name="description" content="([^"]+)"/i)) || htmlText(matchFirst(episodeHtml, /<p[^>]*>([\s\S]*?)<\/p>/i));
    const youtubeEmbed = matchFirst(episodeHtml, /https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/);
    const episode = {
      id: slugify(title).slice(0, 96),
      title,
      publishedAt: null,
      duration: null,
      episodeUrl: youtubeEmbed ? `https://www.youtube.com/watch?v=${youtubeEmbed}` : url,
      audioUrl: null,
      audioType: null,
      description: normalizeSpaces(description).slice(0, 900),
      transcript: {
        status: "remote-found",
        remoteLinks: [{ url, type: "text/html", language: "en" }],
        localPath: null,
        localUrl: null,
        sourceType: "text/html",
        note: "Humanloop episode page exposes highlights and transcript content."
      },
      article: {
        status: "missing",
        localPath: null,
        localUrl: null,
        note: "Article generation requires transcript text."
      },
      resources: [{ label: "原文与 Transcript", url, type: "source" }]
    };
    await attachHumanloopTranscriptAndArticle(podcast, episode, episodeHtml, url);
    episodes.push(episode);
  }
  return { episodes };
}

async function attachHumanloopTranscriptAndArticle(podcast, episode, episodeHtml, url) {
  const transcriptDir = path.join(transcriptRoot, podcast.id);
  const articleDir = path.join(articleRoot, podcast.id);
  fs.mkdirSync(transcriptDir, { recursive: true });
  fs.mkdirSync(articleDir, { recursive: true });
  const transcriptPath = path.join(transcriptDir, `${episode.id}.md`);
  const articlePath = path.join(articleDir, `${episode.id}.md`);
  if (!fs.existsSync(transcriptPath)) {
    const text = readableTextFromHtml(episodeHtml);
    fs.writeFileSync(transcriptPath, buildTranscriptMarkdown(podcast, episode, { text, type: "text/html" }), "utf8");
  }
  episode.transcript.status = "ready";
  episode.transcript.localPath = relativePath(transcriptPath);
  episode.transcript.localUrl = `/${episode.transcript.localPath}`;
  episode.transcript.note = "Saved from Humanloop highlights/transcript page.";

  if (!fs.existsSync(articlePath)) {
    const article = buildLearningArticle(podcast, episode, fs.readFileSync(transcriptPath, "utf8"));
    fs.writeFileSync(articlePath, article, "utf8");
  }
  episode.article.status = "ready";
  episode.article.localPath = relativePath(articlePath);
  episode.article.localUrl = `/${episode.article.localPath}`;
  episode.article.note = "Generated from episode transcript page with Qiaomu writing constraints.";
  episode.resources.push({ label: "Transcript", url: episode.transcript.localUrl, type: "transcript" });
  episode.resources.push({ label: "学习文章", url: episode.article.localUrl, type: "article" });
  if (url !== episode.episodeUrl) {
    episode.resources.push({ label: "Humanloop 原文", url, type: "source" });
  }
}

function mergeExistingArtifacts(episode, previous) {
  if (!previous) return;
  if (!episode.summary?.localPath && previous.summary?.localPath && fs.existsSync(path.join(root, previous.summary.localPath))) {
    episode.summary = previous.summary;
  }
  const existingResources = new Map((episode.resources || []).map((resource) => [`${resource.type}:${resource.url}`, resource]));
  for (const resource of previous.resources || []) {
    if (resource.type === "summary" && !existingResources.has(`${resource.type}:${resource.url}`)) {
      episode.resources.push(resource);
    }
  }
}

function normalizeEpisode(podcast, item) {
  const title = textOf(item.title) || "Untitled episode";
  const publishedAt = dateOrNull(textOf(item.pubDate) || textOf(item.published) || textOf(item.updated));
  const idSeed = [publishedAt?.slice(0, 10), title].filter(Boolean).join(" ");
  const episodeId = slugify(idSeed || textOf(item.guid) || title).slice(0, 96) || slugify(title);
  const enclosure = enclosureOf(item);
  const transcriptLinks = transcriptLinksOf(item);
  const link = linkOf(item);
  const rawDescription = textOf(item["content:encoded"]) || textOf(item.description) || textOf(item.summary) || "";
  const description = normalizeSpaces(stripHtml(rawDescription)).slice(0, 900);

  return {
    id: episodeId,
    title,
    publishedAt,
    duration: textOf(item["itunes:duration"]) || null,
    episodeUrl: link,
    audioUrl: enclosure?.url || null,
    audioType: enclosure?.type || null,
    description,
    transcript: {
      status: transcriptLinks.length ? "remote-found" : "missing",
      remoteLinks: transcriptLinks,
      localPath: null,
      localUrl: null,
      sourceType: null,
      note: transcriptLinks.length ? "RSS feed exposes transcript metadata." : "No transcript metadata found in the RSS item yet."
    },
    article: {
      status: "missing",
      localPath: null,
      localUrl: null,
      note: "Article generation requires transcript text."
    },
    resources: []
  };
}

async function attachTranscriptAndArticle(podcast, episode) {
  const transcriptDir = path.join(transcriptRoot, podcast.id);
  const articleDir = path.join(articleRoot, podcast.id);
  fs.mkdirSync(transcriptDir, { recursive: true });
  fs.mkdirSync(articleDir, { recursive: true });

  const transcriptPath = path.join(transcriptDir, `${episode.id}.md`);
  const articlePath = path.join(articleDir, `${episode.id}.md`);
  if (fs.existsSync(transcriptPath)) {
    episode.transcript.status = "ready";
    episode.transcript.localPath = relativePath(transcriptPath);
    episode.transcript.localUrl = `/${episode.transcript.localPath}`;
    episode.transcript.note = "Transcript already exists locally.";
  } else {
    const transcript = await fetchFirstTranscript(episode.transcript.remoteLinks);
    if (transcript?.text) {
      const body = buildTranscriptMarkdown(podcast, episode, transcript);
      fs.writeFileSync(transcriptPath, body, "utf8");
      episode.transcript.status = "ready";
      episode.transcript.localPath = relativePath(transcriptPath);
      episode.transcript.localUrl = `/${episode.transcript.localPath}`;
      episode.transcript.sourceType = transcript.type;
      episode.transcript.note = "Transcript fetched from RSS transcript metadata.";
    }
  }

  if (fs.existsSync(articlePath)) {
    episode.article.status = "ready";
    episode.article.localPath = relativePath(articlePath);
    episode.article.localUrl = `/${episode.article.localPath}`;
    episode.article.note = "Learning article already exists locally.";
  } else if (episode.transcript.localPath) {
    const transcriptText = fs.readFileSync(path.join(root, episode.transcript.localPath), "utf8");
    const article = buildLearningArticle(podcast, episode, transcriptText);
    fs.writeFileSync(articlePath, article, "utf8");
    episode.article.status = "ready";
    episode.article.localPath = relativePath(articlePath);
    episode.article.localUrl = `/${episode.article.localPath}`;
    episode.article.note = "Generated from transcript with Qiaomu writing constraints.";
  }

  if (episode.transcript.localUrl) {
    episode.resources.push({ label: "Transcript", url: episode.transcript.localUrl, type: "transcript" });
  }
  if (episode.article.localUrl) {
    episode.resources.push({ label: "学习文章", url: episode.article.localUrl, type: "article" });
  }
}

async function fetchFirstTranscript(links) {
  for (const link of links) {
    try {
      const raw = await fetchText(link.url);
      const text = transcriptTextFrom(raw, link.type);
      if (text.length > 1000) {
        return { text, type: link.type || "text" };
      }
    } catch {
      continue;
    }
  }
  return null;
}

function transcriptTextFrom(raw, type = "") {
  if (/json/i.test(type)) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.segments)) {
        return parsed.segments.map((segment) => segment.body || segment.text || "").join("\n");
      }
      if (Array.isArray(parsed)) {
        return parsed.map((segment) => segment.body || segment.text || "").join("\n");
      }
    } catch {
      return normalizeSpaces(stripHtml(raw));
    }
  }
  if (/srt|vtt/i.test(type) || /^WEBVTT/.test(raw)) {
    return raw
      .split(/\r?\n/)
      .filter((line) => line && !/^WEBVTT/.test(line) && !/^\d+$/.test(line) && !/-->/ .test(line))
      .join("\n");
  }
  return normalizeSpaces(stripHtml(raw));
}

function buildTranscriptMarkdown(podcast, episode, transcript) {
  return [
    `# ${episode.title}`,
    "",
    `- Podcast: ${podcast.title}`,
    `- Published: ${episode.publishedAt || "Unknown"}`,
    `- Source: ${episode.episodeUrl || podcast.officialUrl}`,
    `- Transcript type: ${transcript.type}`,
    "",
    "## Transcript",
    "",
    transcript.text.trim(),
    ""
  ].join("\n");
}

function buildLearningArticle(podcast, episode, transcriptText) {
  const clean = normalizeSpaces(stripMarkdownMeta(transcriptText));
  const sentences = clean
    .split(/(?<=[.!?。！？])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 40);
  const highlights = pickHighlights(sentences);
  const title = `听完 ${podcast.title} 这一期，我会先记住这几个问题`;
  const date = episode.publishedAt ? episode.publishedAt.slice(0, 10) : "未知日期";

  return [
    `# ${title}`,
    "",
    `> 基于 ${podcast.title}《${episode.title}》Transcript 整理。`,
    "",
    `这一期发布于 ${date}。如果你只是把它当成背景音，很容易听完就过去了。真正值得留下来的，是里面反复出现的几个判断：技术进展不是新闻标题，产品机会也不是模型能力的简单外推。`,
    "",
    "我会把这期先当成一份学习材料，而不是一篇新闻来看。",
    "",
    "**先问清楚它到底在解决什么问题。**",
    "",
    highlights.slice(0, 2).map((line) => `- ${line}`).join("\n") || "- Transcript 里反复出现的问题意识，比单个结论更值得记录。",
    "",
    "如果你做产品或写代码，最容易犯的错是只记住嘉宾提到的工具名。工具名会过时，但问题结构不会那么快过时。",
    "",
    "**第二个值得留意的是：谁在承担复杂度。**",
    "",
    highlights.slice(2, 4).map((line) => `- ${line}`).join("\n") || "- 好的 AI 产品通常不是把复杂度展示给用户，而是把复杂度搬到系统设计里。",
    "",
    "很多 AI 讨论听起来很兴奋，但落到真实工作里，问题会变得朴素：数据从哪里来，错误怎么发现，用户什么时候信任，成本什么时候失控。",
    "",
    "**最后，把这一期变成行动。**",
    "",
    "你可以做三件事：",
    "",
    "1. 重听嘉宾解释核心概念的那一段，别急着总结成金句。",
    "2. 找一个自己的工作场景，问一句：这里有没有被模型能力重新定价的环节？",
    "3. 把不确定的地方列出来，下次听同类节目时专门验证。",
    "",
    "这类播客最有价值的地方，不是替你给答案，而是逼你把问题问得更具体。",
    "",
    "## 参考资源",
    "",
    `- 播客：${podcast.title}`,
    `- 本期：${episode.title}`,
    `- 原始链接：${episode.episodeUrl || podcast.officialUrl}`,
    `- Transcript：/${path.posix.join("content", "transcripts", podcast.id, `${episode.id}.md`)}`,
    ""
  ].join("\n");
}

function pickHighlights(sentences) {
  const scored = sentences.map((sentence) => {
    const score = [
      /AI|agent|model|LLM|data|product|research|system|evaluation|training/i.test(sentence) ? 2 : 0,
      sentence.length > 80 && sentence.length < 260 ? 1 : 0,
      /because|why|how|what|problem|challenge|opportunity/i.test(sentence) ? 1 : 0
    ].reduce((sum, value) => sum + value, 0);
    return { sentence, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => item.sentence.replace(/\s+/g, " ").slice(0, 240));
}

function enclosureOf(item) {
  const enclosure = asArray(item.enclosure)[0];
  if (!enclosure) return null;
  return {
    url: enclosure["@_url"] || null,
    type: enclosure["@_type"] || null,
    length: enclosure["@_length"] || null
  };
}

function transcriptLinksOf(item) {
  return asArray(item["podcast:transcript"]).map((entry) => ({
    url: entry["@_url"],
    type: entry["@_type"] || "text/plain",
    language: entry["@_language"] || entry["@_lang"] || null
  })).filter((entry) => entry.url);
}

function linkOf(item) {
  const link = item.link;
  if (Array.isArray(link)) {
    const href = link.find((entry) => entry?.["@_rel"] === "alternate")?.["@_href"] || link[0]?.["@_href"] || textOf(link[0]);
    return href || null;
  }
  if (typeof link === "object" && link) {
    return link["@_href"] || textOf(link);
  }
  return textOf(link) || null;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "QiaomuAIIndex/0.2 (+https://youtube.qiaomu.ai)"
      }
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
}

function previousEpisodesFor(podcastId) {
  const episodePath = path.join(root, "data", "episodes", `${podcastId}.json`);
  if (!fs.existsSync(episodePath)) return [];
  try {
    return asArray(JSON.parse(fs.readFileSync(episodePath, "utf8")).episodes);
  } catch {
    return [];
  }
}

function fallbackEpisodesFromLocalArtifacts(podcast) {
  const transcriptDir = path.join(transcriptRoot, podcast.id);
  if (!fs.existsSync(transcriptDir)) return [];
  return fs.readdirSync(transcriptDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .slice(0, limit)
    .map((file) => {
      const id = file.replace(/\.md$/, "");
      const transcriptPath = path.join(transcriptDir, file);
      const articlePath = path.join(articleRoot, podcast.id, file);
      const transcriptMarkdown = fs.readFileSync(transcriptPath, "utf8");
      const title = matchFirst(transcriptMarkdown, /^#\s+(.+)$/m) || titleFromUrl(`https://example.com/${id}`);
      const published = matchFirst(transcriptMarkdown, /^- Published:\s+(.+)$/m);
      const source = matchFirst(transcriptMarkdown, /^- Source:\s+(.+)$/m) || podcast.officialUrl;
      const transcriptLocalPath = relativePath(transcriptPath);
      const articleLocalPath = fs.existsSync(articlePath) ? relativePath(articlePath) : null;
      const resources = [
        { label: "Transcript", url: `/${transcriptLocalPath}`, type: "transcript" }
      ];
      if (articleLocalPath) {
        resources.push({ label: "学习文章", url: `/${articleLocalPath}`, type: "article" });
      }
      if (/^https?:\/\//.test(source)) {
        resources.push({ label: "原始页面", url: source, type: "source" });
      }
      return {
        id,
        title,
        publishedAt: published && published !== "Unknown" ? dateOrNull(published) : null,
        duration: null,
        episodeUrl: /^https?:\/\//.test(source) ? source : podcast.officialUrl,
        audioUrl: null,
        audioType: null,
        description: "从本地已保存 Transcript 和学习文章恢复的节目条目。",
        transcript: {
          status: "ready",
          remoteLinks: [],
          localPath: transcriptLocalPath,
          localUrl: `/${transcriptLocalPath}`,
          sourceType: "text/html",
          note: "Recovered from local transcript artifact after source fetch failed."
        },
        article: articleLocalPath ? {
          status: "ready",
          localPath: articleLocalPath,
          localUrl: `/${articleLocalPath}`,
          note: "Recovered from local article artifact after source fetch failed."
        } : {
          status: "missing",
          localPath: null,
          localUrl: null,
          note: "No local learning article artifact found."
        },
        resources
      };
    });
}

function writeJson(relative, value) {
  fs.mkdirSync(path.dirname(path.join(root, relative)), { recursive: true });
  fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function asArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function textOf(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (typeof value === "object") return textOf(value["#cdata"] || value["#text"]);
  return "";
}

function dateOrNull(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function readableTextFromHtml(html) {
  const title = htmlText(matchFirst(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const main = matchFirst(html, /<main[^>]*>([\s\S]*?)<\/main>/i) || html;
  const text = htmlText(main)
    .replace(/Humanloop is joining Anthropic[\s\S]*?View the announcement/gi, "")
    .replace(/Ready to build successful AI products\?[\s\S]*$/i, "")
    .trim();
  return [title, text].filter(Boolean).join("\n\n");
}

function htmlText(value) {
  return normalizeSpaces(stripHtml(String(value || "")
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&#x27;/g, "'")));
}

function matchFirst(value, regex) {
  const match = String(value).match(regex);
  return match ? match[1] : "";
}

function absoluteUrl(url, base) {
  return new URL(url, base).toString();
}

function titleFromUrl(url) {
  return path.basename(new URL(url).pathname).replace(/-/g, " ");
}

function stripMarkdownMeta(value) {
  return String(value)
    .replace(/^# .+$/gm, "")
    .replace(/^- .+$/gm, "");
}

function normalizeSpaces(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function relativePath(absolute) {
  return path.relative(root, absolute).split(path.sep).join("/");
}
