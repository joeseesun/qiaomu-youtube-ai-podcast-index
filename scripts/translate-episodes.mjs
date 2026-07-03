import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const provider = {
  baseUrl: process.env.TRANSLATE_BASE_URL || "https://api.aigocode.com/v1",
  model: process.env.TRANSLATE_MODEL || "gpt-5.4-mini",
  service: process.env.TRANSLATE_KEYCHAIN_SERVICE || "qiaomu-llm",
  account: process.env.TRANSLATE_KEYCHAIN_ACCOUNT || "aigocode-openai"
};
const limit = Number.parseInt(process.env.TRANSLATE_LIMIT || "0", 10);
const batchSize = Number.parseInt(process.env.TRANSLATE_BATCH_SIZE || "5", 10);
const apiKey = process.env.OPENAI_API_KEY || readKeychainSecret(provider.service, provider.account);
const podcastData = readJson("data/podcasts.json");
const candidates = collectCandidates().slice(0, limit > 0 ? limit : undefined);

if (candidates.length === 0) {
  console.log("No episode translations missing.");
  process.exit(0);
}

let translated = 0;
for (let index = 0; index < candidates.length; index += batchSize) {
  const batch = candidates.slice(index, index + batchSize);
  const result = await translateBatch(batch);
  for (const item of result) {
    const target = batch.find((candidate) => candidate.episode.id === item.id);
    if (!target) continue;
    const titleZh = cleanText(item.titleZh || item.title_zh || item.zhTitle || item.chineseTitle || item.titleCn || item.title_cn);
    const descriptionZh = cleanText(item.descriptionZh || item.description_zh || item.zhDescription || item.chineseDescription || item.descriptionCn || item.description_cn);
    if (!titleZh && !target.episode.titleZh) {
      throw new Error(`Translation result missing titleZh for ${item.id}`);
    }
    if (!descriptionZh && !target.episode.descriptionZh) {
      throw new Error(`Translation result missing descriptionZh for ${item.id}`);
    }
    target.episode.titleZh = titleZh || target.episode.titleZh;
    target.episode.descriptionZh = descriptionZh || target.episode.descriptionZh;
    target.episode.translation = {
      provider: "aigocode-openai",
      model: provider.model,
      updatedAt: new Date().toISOString()
    };
    translated += 1;
  }
  for (const item of uniqueEpisodeData(batch)) {
    fs.writeFileSync(item.episodeFile, `${JSON.stringify(item.episodeData, null, 2)}\n`, "utf8");
  }
  console.log(`Translated ${Math.min(index + batch.length, candidates.length)}/${candidates.length} episode metadata items.`);
}

console.log(`Episode translation complete: ${translated} updated.`);

function collectCandidates() {
  const items = [];
  for (const podcast of podcastData.podcasts) {
    const episodeFile = path.join(root, "data", "episodes", `${podcast.id}.json`);
    if (!fs.existsSync(episodeFile)) continue;
    const episodeData = readJson(path.relative(root, episodeFile));
    for (const episode of episodeData.episodes || []) {
      if (episode.titleZh && episode.descriptionZh) continue;
      items.push({ podcast, episode, episodeData, episodeFile });
    }
  }
  return items;
}

function uniqueEpisodeData(batch) {
  const seen = new Set();
  const items = [];
  for (const item of batch) {
    if (seen.has(item.episodeFile)) continue;
    seen.add(item.episodeFile);
    items.push(item);
  }
  return items;
}

async function translateBatch(batch) {
  const payload = batch.map(({ podcast, episode }) => ({
    id: episode.id,
    podcast: podcast.title,
    title: episode.title,
    description: String(episode.description || "").slice(0, 1800)
  }));
  const body = {
    model: provider.model,
    messages: [
      {
        role: "system",
        content: [
          "你是面向中文 AI 学习者的播客元数据译者。",
          "把英文播客标题和简介译成自然、准确、可读的简体中文。",
          "保留人名、公司名、模型名、论文/产品名的英文原名；不要编造原文没有的信息。",
          "每个对象必须包含且只能包含 id、titleZh、descriptionZh。",
          "titleZh 必须是中文标题，不得为空；descriptionZh 必须是中文简介，不得为空。",
          "descriptionZh 控制在 90-160 个汉字，保留核心主题、嘉宾和听点。",
          "只输出 JSON 数组，不要 Markdown，不要解释。"
        ].join("\n")
      },
      { role: "user", content: JSON.stringify(payload) }
    ],
    temperature: 0.2,
    max_tokens: 4000
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
    throw new Error(`Translation API failed ${response.status}: ${text.slice(0, 500)}`);
  }
  const data = JSON.parse(text);
  const content = data?.choices?.[0]?.message?.content || "";
  const parsed = parseJsonArray(content);
  if (!Array.isArray(parsed)) {
    throw new Error(`Translation API returned non-array JSON: ${content.slice(0, 300)}`);
  }
  return parsed;
}

function parseJsonArray(content) {
  const trimmed = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("[");
    const end = trimmed.lastIndexOf("]");
    if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
    throw new Error(`Unable to parse translation JSON: ${trimmed.slice(0, 300)}`);
  }
}

function cleanText(value) {
  return String(value || "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
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
