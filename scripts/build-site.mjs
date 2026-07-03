import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const root = process.env.YOUTUBE_SITE_ROOT || process.cwd();
const data = readJson("data/podcasts.json");
const episodesIndexPath = path.join(root, "data", "episodes-index.json");
const episodesIndex = fs.existsSync(episodesIndexPath) ? readJson("data/episodes-index.json") : { podcasts: [] };
const categoryLabels = {
  engineering: "工程实战",
  research: "研究前沿",
  founders: "创业产品",
  news: "新闻综述",
  business: "商业落地",
  culture: "社会文化"
};
const markdownSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [
      ...(defaultSchema.attributes?.["*"] || []),
      "className",
      "id"
    ],
    a: [
      ...(defaultSchema.attributes?.a || []),
      "target",
      "rel"
    ],
    input: [
      ...(defaultSchema.attributes?.input || []),
      ["checked", true]
    ]
  }
};
const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypeSanitize, markdownSchema)
  .use(rehypeStringify);

for (const podcast of data.podcasts) {
  const detailsDir = path.join(root, "podcasts", podcast.id);
  fs.mkdirSync(detailsDir, { recursive: true });
  const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
  const episodes = fs.existsSync(episodeFile) ? readJson(path.relative(root, episodeFile)).episodes : [];
  buildResourcePages(podcast, episodes);
  fs.writeFileSync(path.join(detailsDir, "index.html"), renderPodcastPage(podcast, episodes), "utf8");
}

fs.writeFileSync(path.join(root, "podcasts", "index.html"), renderPodcastIndex(), "utf8");
console.log(`Built ${data.podcasts.length} podcast detail pages. Episode snapshot: ${episodesIndex.generatedAt || "missing"}.`);

function renderPodcastPage(podcast, episodes) {
  const readyTranscripts = episodes.filter((episode) => episode.transcript?.localUrl).length;
  const readySummaries = episodes.filter((episode) => episode.summary?.localUrl).length;
  const transcriptBackedSummaries = episodes.filter((episode) => episode.summary?.localUrl && episode.transcript?.localUrl).length;
  const fallbackSummaries = readySummaries - transcriptBackedSummaries;
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(podcast.title)} | AI 播客索引</title>
    <meta name="description" content="${escapeAttribute(podcast.summary)}">
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="../../styles.css">
    <script defer src="https://umami.qiaomu.ai/script.js" data-website-id="3e7eb554-c1be-425b-bad1-ff974fa7fca4" data-domains="youtube.qiaomu.ai"></script>
  </head>
  <body>
    ${siteHeader("../../")}
    <main class="detail-main">
      <nav class="breadcrumb" aria-label="面包屑"><a href="../../">AI 播客索引</a><span>/</span><span>${escapeHtml(podcast.title)}</span></nav>
      <section class="podcast-detail-hero">
        <img src="${escapeAttribute(podcast.artworkUrl)}" alt="${escapeAttribute(podcast.title)} 封面" referrerpolicy="no-referrer">
        <div>
          <p class="eyebrow">${escapeHtml(categoryLabels[podcast.category] || podcast.category)} · ${escapeHtml(podcast.language)}</p>
          <h1>${escapeHtml(podcast.title)}</h1>
          <p class="detail-hosts">${escapeHtml(podcast.hosts)} · ${escapeHtml(podcast.cadence)}</p>
          <p class="lead">${escapeHtml(podcast.summary)}</p>
          <p class="card-why">${escapeHtml(podcast.why)}</p>
          <div class="detail-actions">
            <a class="primary-action" href="${escapeAttribute(podcast.youtubeUrl)}" target="_blank" rel="noopener">YouTube</a>
            <a class="secondary-action" href="${escapeAttribute(podcast.officialUrl)}" target="_blank" rel="noopener">官网</a>
            <a class="secondary-action" href="${escapeAttribute(podcast.appleUrl)}" target="_blank" rel="noopener">Apple</a>
          </div>
        </div>
      </section>
      <section class="detail-stats" aria-label="播客资源统计">
        <div><span>${episodes.length}</span><small>已抓取节目</small></div>
        <div><span>${readyTranscripts}</span><small>Transcript</small></div>
        <div><span>${transcriptBackedSummaries}</span><small>深度总结</small></div>
        <div><span>${fallbackSummaries}</span><small>概要</small></div>
      </section>
      <section class="episodes-section" aria-labelledby="episodes-title">
        <div class="section-heading">
          <p class="eyebrow">Episodes</p>
          <h2 id="episodes-title">往期节目与学习资源</h2>
        </div>
        ${episodes.length ? `<div class="episode-list">${episodes.map((episode) => renderEpisode(podcast, episode)).join("")}</div>` : emptyEpisodes()}
      </section>
    </main>
    ${siteFooter("../../")}
    ${siteModals("../../")}
    ${siteChromeScript()}
  </body>
</html>`;
}

function renderEpisode(podcast, episode) {
  const titleZh = episode.titleZh ? `<h3 class="episode-title-zh">${escapeHtml(episode.titleZh)}</h3>` : "";
  const titleOriginal = episode.titleZh ? `<p class="episode-title-original">${escapeHtml(episode.title)}</p>` : `<h3>${escapeHtml(episode.title)}</h3>`;
  const descriptionZh = episode.descriptionZh
    ? `<p class="episode-description-zh">${escapeHtml(episode.descriptionZh)}</p>`
    : `<p>${escapeHtml(episode.description || "暂无简介。")}</p>`;
  const descriptionOriginal = episode.descriptionZh && episode.description
    ? `<details class="original-description"><summary>英文简介</summary><p>${escapeHtml(episode.description)}</p></details>`
    : "";
  const transcript = episode.transcript?.localUrl
    ? `<a class="resource-link ready" href="../../${htmlResourcePath(episode.transcript.localPath)}">Transcript</a>`
    : `<span class="resource-link pending">Transcript 待获取</span>`;
  const summary = episode.summary?.localUrl
    ? `<a class="resource-link ready" href="../../${htmlResourcePath(episode.summary.localPath)}">${summaryResourceLabel(episode)}</a>`
    : `<span class="resource-link pending">总结待获取</span>`;
  const audio = episode.audioUrl
    ? `<audio controls preload="none" src="${escapeAttribute(episode.audioUrl)}"></audio>`
    : `<p class="resource-note">这个 RSS 条目没有公开音频文件，建议打开原始链接或 YouTube。</p>`;
  const sourceLabel = sourceLinkLabel(episode.episodeUrl);
  return `<article class="episode-card">
    <div class="episode-copy">
      <p class="episode-date">${episode.publishedAt ? formatDate(episode.publishedAt) : "日期未知"}${episode.duration ? ` · ${escapeHtml(episode.duration)}` : ""}</p>
      ${titleZh}
      ${titleOriginal}
      ${descriptionZh}
      ${descriptionOriginal}
      <div class="episode-resources">${summary}${transcript}${episode.episodeUrl ? `<a class="resource-link" href="${escapeAttribute(episode.episodeUrl)}" target="_blank" rel="noopener">${sourceLabel}</a>` : ""}</div>
    </div>
    <div class="episode-player">${audio}</div>
  </article>`;
}

function buildResourcePages(podcast, episodes) {
  for (const episode of episodes) {
    for (const [kind, artifact] of Object.entries({ transcript: episode.transcript, summary: episode.summary })) {
      if (!artifact?.localPath) continue;
      const markdownPath = path.join(root, artifact.localPath);
      if (!fs.existsSync(markdownPath)) continue;
      const htmlPath = path.join(root, htmlResourcePath(artifact.localPath));
      fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
      const summaryLabel = summaryResourceLabel(episode);
      fs.writeFileSync(htmlPath, renderMarkdownPage({
        title: kind === "summary" ? `${summaryLabel}：${episode.title}` : `Transcript：${episode.title}`,
        subtitle: `${podcast.title} · ${kind === "summary" ? summaryLabel : "转写文本"}`,
        markdown: fs.readFileSync(markdownPath, "utf8")
      }), "utf8");
    }
  }
}

function renderMarkdownPage({ title, subtitle, markdown }) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | AI 播客索引</title>
    <link rel="icon" href="../../../favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="../../../styles.css">
    <script defer src="https://umami.qiaomu.ai/script.js" data-website-id="3e7eb554-c1be-425b-bad1-ff974fa7fca4" data-domains="youtube.qiaomu.ai"></script>
  </head>
  <body>
    ${siteHeader("../../../")}
    <main class="reading-main">
      <nav class="breadcrumb" aria-label="面包屑"><a href="../../../">AI 播客索引</a><span>/</span><span>${escapeHtml(subtitle)}</span></nav>
      <article class="reading-article">
        ${markdownToHtml(markdown)}
      </article>
    </main>
    ${siteFooter("../../../")}
    ${siteModals("../../../")}
    ${siteChromeScript()}
  </body>
</html>`;
}

function markdownToHtml(markdown) {
  return String(markdownProcessor.processSync(markdown));
}

function renderPodcastIndex() {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>全部播客 | AI 播客索引</title><link rel="stylesheet" href="../styles.css"></head><body>${siteHeader("../")}<main class="results-band"><h1>全部播客</h1><div class="podcast-link-list">${data.podcasts.map((podcast) => `<a href="./${podcast.id}/">${escapeHtml(podcast.title)}</a>`).join("")}</div></main>${siteFooter("../")}${siteModals("../")}${siteChromeScript()}</body></html>`;
}

function emptyEpisodes() {
  return `<div class="empty-state"><h3>还没有抓取到节目</h3><p>运行 <code>npm run fetch:episodes</code> 后再构建详情页。</p></div>`;
}

function htmlResourcePath(markdownPath) {
  return markdownPath.replace(/\.md$/, ".html");
}

function sourceLinkLabel(url) {
  if (/youtube\.com|youtu\.be/i.test(url || "")) return "YouTube";
  return "原始页面";
}

function summaryResourceLabel(episode) {
  if (episode.transcript?.localUrl) return "总结笔记";
  const note = String(episode.summary?.note || "");
  if (/网页|页面|webpage|article/i.test(note)) return "页面概要";
  return "简介概要";
}

function siteHeader(prefix = "") {
  return `<header class="site-header">
    <div class="brand-block">
      <a class="brand-mark" href="${prefix}" aria-label="AI 播客索引首页">${brandIcon()}</a>
      <div><h1>AI 播客索引</h1></div>
    </div>
    <nav class="site-actions" aria-label="站点操作">
      <a class="icon-link" href="https://tuijian.qiaomu.ai/" target="_blank" rel="noopener" aria-label="打开乔木推荐" data-tooltip="乔木推荐"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v14H7l-3 3V4Zm2 2v10.2L6.8 15H18V6H6Zm3 3h6v2H9V9Zm0 4h9v2H9v-2Z"/></svg></a>
      <button class="icon-link js-open-modal" type="button" data-modal="reward" aria-label="打赏支持" data-tooltip="打赏"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 7h-2.1A3.5 3.5 0 0 0 12 3.4 3.5 3.5 0 0 0 6.1 7H4v5h1v8h14v-8h1V7ZM9.5 5A1.5 1.5 0 0 1 11 6.5V7H8.5A1.5 1.5 0 0 1 9.5 5Zm5 0A1.5 1.5 0 0 1 15.5 7H13v-.5A1.5 1.5 0 0 1 14.5 5ZM6 9h5v1H6V9Zm1 3h4v6H7v-6Zm10 6h-4v-6h4v6Zm1-8h-5V9h5v1Z"/></svg></button>
      <button class="icon-link js-open-modal" type="button" data-modal="follow" aria-label="关注向阳乔木" data-tooltip="关注"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v2.3c0 1-.4 2-1.1 2.8L4.6 14.5A1.5 1.5 0 0 0 5.7 17H9a3 3 0 0 0 6 0h3.3a1.5 1.5 0 0 0 1.1-2.5l-1.3-1.4a4.1 4.1 0 0 1-1.1-2.8V8a5 5 0 0 0-5-5Zm0 16a1 1 0 0 1-1-1h2a1 1 0 0 1-1 1Zm-5.2-4 1.1-1.2c.8-.9 1.1-2.1 1.1-3.5V8a3 3 0 1 1 6 0v2.3c0 1.4.4 2.6 1.2 3.6l1.1 1.1H6.8Z"/></svg></button>
      <a class="icon-link" href="https://github.com/joeseesun/" target="_blank" rel="noopener" aria-label="打开 GitHub" data-tooltip="GitHub"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5A3.9 3.9 0 0 1 6.6 8.8c-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.8 1.1A9.6 9.6 0 0 1 12 6.7c.9 0 1.7.1 2.5.4 1.9-1.4 2.8-1.1 2.8-1.1.6 1.5.2 2.5.1 2.8a3.9 3.9 0 0 1 1.1 2.8c0 3.8-2.4 4.7-4.7 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg></a>
      <a class="icon-link" href="https://x.com/vista8" target="_blank" rel="noopener" aria-label="打开 X" data-tooltip="X"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.6 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.3L5 21H1.9l7.3-8.4L1.5 3h6.4l4.4 5.8L17.6 3Zm-1.1 16h1.7L7 4.9H5.2L16.5 19Z"/></svg></a>
    </nav>
  </header>`;
}

function brandIcon() {
  return `<svg aria-hidden="true" viewBox="0 0 64 64" focusable="false">
    <rect x="5.5" y="5.5" width="53" height="53" rx="12.5"/>
    <path class="brand-play" d="M18 41V24.5c0-3.6 3.9-5.8 7-3.9l13.6 8.2c2.9 1.7 2.9 5.9 0 7.6L25 44.7c-3.1 1.9-7-.4-7-3.7Z"/>
    <path class="brand-cutout" d="M23.2 37.8V27.7c0-1 .8-1.6 1.7-1.1l8.5 5.1c.8.5.8 1.6 0 2.1l-8.5 5.1c-.9.5-1.7-.1-1.7-1.1Z"/>
    <path class="brand-wave" d="M43.8 19.2c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v25.6c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2V19.2Zm-8.2 2.6c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v20.4c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2V21.8Zm-24 5.2c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v10c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2V27Z"/>
    <circle class="brand-dot" cx="49" cy="15" r="4.2"/>
  </svg>`;
}

function siteFooter(prefix = "") {
  return `<footer class="site-footer"><p>整理：向阳乔木 · <a href="https://tuijian.qiaomu.ai/" target="_blank" rel="noopener">乔木推荐</a></p><p class="source-note"><a href="${prefix}data/podcasts.json">播客索引数据</a></p></footer>`;
}

function siteModals(prefix = "") {
  return `<div class="modal-backdrop" id="modal-backdrop" hidden></div>
    <section class="modal" id="modal-reward" role="dialog" aria-modal="true" aria-labelledby="reward-title" hidden>
      <button class="modal-close" type="button" aria-label="关闭弹窗"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6.4 5 12.7 12.7-1.4 1.4L5 6.4 6.4 5Zm12.7 1.4L6.4 19.1 5 17.7 17.7 5l1.4 1.4Z"/></svg></button>
      <h2 id="reward-title">打赏支持</h2>
      <p>如果这个索引帮你省下了筛选时间，可以请乔木喝杯咖啡。</p>
      <img src="${prefix}public/qiaomu/reward-qr.png" alt="向阳乔木打赏二维码" width="320" height="320" loading="lazy">
    </section>
    <section class="modal" id="modal-follow" role="dialog" aria-modal="true" aria-labelledby="follow-title" hidden>
      <button class="modal-close" type="button" aria-label="关闭弹窗"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6.4 5 12.7 12.7-1.4 1.4L5 6.4 6.4 5Zm12.7 1.4L6.4 19.1 5 17.7 17.7 5l1.4 1.4Z"/></svg></button>
      <h2 id="follow-title">关注向阳乔木</h2>
      <p>公众号「向阳乔木推荐看」持续分享 AI 工具、产品判断和实战工作流。</p>
      <img src="${prefix}public/qiaomu/wechat-public-account-qr.jpg" alt="向阳乔木推荐看公众号二维码" width="320" height="320" loading="lazy">
      <div class="modal-links">
        <a href="https://github.com/joeseesun/" target="_blank" rel="noopener">GitHub</a>
        <a href="https://x.com/vista8" target="_blank" rel="noopener">X</a>
        <a href="https://tuijian.qiaomu.ai/" target="_blank" rel="noopener">乔木推荐</a>
      </div>
    </section>`;
}

function siteChromeScript() {
  return `<script>
    (() => {
      const backdrop = document.querySelector("#modal-backdrop");
      let activeModal = null;
      document.querySelectorAll(".js-open-modal").forEach((button) => {
        button.addEventListener("click", () => {
          activeModal = document.querySelector("#modal-" + button.dataset.modal);
          if (!activeModal || !backdrop) return;
          backdrop.hidden = false;
          activeModal.hidden = false;
          activeModal.querySelector(".modal-close").focus();
          document.body.style.overflow = "hidden";
        });
      });
      document.querySelectorAll(".modal-close").forEach((button) => button.addEventListener("click", closeModal));
      backdrop?.addEventListener("click", closeModal);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && activeModal) closeModal();
      });
      function closeModal() {
        if (!activeModal || !backdrop) return;
        activeModal.hidden = true;
        backdrop.hidden = true;
        activeModal = null;
        document.body.style.overflow = "";
      }
    })();
  </script>`;
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}
