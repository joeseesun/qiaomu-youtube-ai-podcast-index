import { chromium } from "playwright";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173";
const chromePath = process.env.CHROME_PATH || chromium.executablePath();

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

let failure = null;
try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 950 },
    { name: "mobile", width: 390, height: 844 }
  ]) {
    const page = await browser.newPage({ viewport, userAgent: `Mozilla/5.0 QiaomuSmoke/${viewport.name}` });
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForSelector(".podcast-card");
    const cardCount = await page.locator(".podcast-card").count();
    if (cardCount < 20) throw new Error(`${viewport.name}: expected at least 20 cards, got ${cardCount}`);
    await page.waitForFunction(() => {
      const images = [...document.querySelectorAll(".card-media img")].slice(0, 3);
      return images.length === 3 && images.every((img) => img.complete && img.naturalWidth > 0);
    }, { timeout: 12000 });

    await page.fill("#search", "agents");
    await page.waitForTimeout(150);
    const filteredCount = await page.locator(".podcast-card").count();
    if (filteredCount < 1 || filteredCount >= cardCount) {
      throw new Error(`${viewport.name}: search filter did not narrow results`);
    }

    await page.click("#reset-filters");
    await page.click('[data-category="engineering"]');
    await page.waitForTimeout(150);
    const engineeringCount = await page.locator(".podcast-card").count();
    if (engineeringCount < 1) throw new Error(`${viewport.name}: engineering filter has no results`);

    await verifyNoSourceLeak(page, viewport.name, "home");
    await verifyModal(page, "reward");
    await verifyModal(page, "follow");
    await verifyDetailAndResources(page, viewport.name);
    await verifyMarkdownRendering(page, viewport.name);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) throw new Error(`${viewport.name}: horizontal overflow ${overflow}px`);
    if (consoleErrors.length > 0) throw new Error(`${viewport.name}: console errors: ${consoleErrors.join(" | ")}`);
    await page.close();
  }
  console.log(`UI smoke passed for ${baseUrl}`);
} catch (error) {
  failure = error;
} finally {
  await Promise.race([
    browser.close(),
    new Promise((resolve) => setTimeout(resolve, 5000))
  ]);
}

if (failure) {
  throw failure;
}
process.exit(0);

async function verifyModal(page, name) {
  await page.click(`.js-open-modal[data-modal="${name}"]`);
  const modal = page.locator(`#modal-${name}`);
  await modal.waitFor({ state: "visible" });
  const image = modal.locator("img");
  await image.waitFor({ state: "visible" });
  try {
    await page.waitForFunction(
      (selector) => {
        const img = document.querySelector(selector);
        return img && img.complete && img.naturalWidth > 0;
      },
      `#modal-${name} img`,
      { timeout: 30000 }
    );
  } catch (error) {
    throw new Error(`${name} QR image did not load: ${error.message}`);
  }
  await page.keyboard.press("Escape");
  await modal.waitFor({ state: "hidden" });
}

async function verifyDetailAndResources(page, viewportName) {
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector('.podcast-card[data-id="latent-space"]');
  await page.click('.podcast-card[data-id="latent-space"] .primary-action');
  await page.waitForURL(/\/podcasts\/latent-space\/?$/);
  await page.waitForSelector(".podcast-detail-hero");
  const episodes = await page.locator(".episode-card").count();
  if (episodes < 5) throw new Error(`${viewportName}: latent-space detail expected at least 5 episodes, got ${episodes}`);
  const audioCount = await page.locator(".episode-card audio").count();
  if (audioCount < 1) throw new Error(`${viewportName}: latent-space detail has no audio players`);
  const transcriptCount = await page.locator('.resource-link.ready:has-text("Transcript")').count();
  const summaryCount = await page.locator('.resource-link.ready:has-text("总结笔记")').count();
  if (transcriptCount < 1) throw new Error(`${viewportName}: latent-space detail has no ready transcript links`);
  if (summaryCount < 1) throw new Error(`${viewportName}: latent-space detail has no ready summary links`);
  await verifyNoSourceLeak(page, viewportName, "detail");

  const firstResources = (await page.locator(".episode-resources").first().locator(".resource-link").allTextContents()).map((text) => text.trim());
  const summaryIndex = firstResources.findIndex((text) => text.includes("总结"));
  const transcriptIndex = firstResources.findIndex((text) => text.includes("Transcript"));
  if (summaryIndex < 0 || transcriptIndex < 0 || summaryIndex > transcriptIndex) {
    throw new Error(`${viewportName}: summary resource should appear before Transcript (${firstResources.join(" / ")})`);
  }

  await verifyModal(page, "reward");
  await verifyModal(page, "follow");

  await page.locator('.resource-link.ready:has-text("总结笔记")').first().click();
  await page.waitForSelector(".reading-article");
  const articleHeading = await page.locator(".reading-article h1, .reading-article h2").first().textContent();
  if (!articleHeading || articleHeading.trim().length < 4) {
    throw new Error(`${viewportName}: article page rendered without a useful heading`);
  }
  const articleText = await page.locator(".reading-article").textContent();
  await verifyNoSourceLeak(page, viewportName, "summary article");
  if (/#{4,6}\s/.test(articleText || "")) {
    throw new Error(`${viewportName}: article page exposed raw Markdown heading markers`);
  }
  const structuredHeadings = await page.locator(".reading-article h2, .reading-article h3").count();
  if (structuredHeadings < 3) {
    throw new Error(`${viewportName}: article page did not render enough structured Markdown headings`);
  }

  const detailOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (detailOverflow > 1) throw new Error(`${viewportName}: detail/resource horizontal overflow ${detailOverflow}px`);
}

async function verifyMarkdownRendering(page, viewportName) {
  await page.goto(`${baseUrl}/content/summaries/cognitive-revolution/2026-07-01-1000-designs-a-day-neural-concepts-thomas-von-tschammer-on-ai-native-engineering.html`, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector(".reading-article");
  await verifyNoSourceLeak(page, viewportName, "markdown article");
  const headingCount = await page.locator(".reading-article h2, .reading-article h3").count();
  if (headingCount < 3) throw new Error(`${viewportName}: Markdown headings did not render`);
  const rawPipeTable = await page.locator(".reading-article").textContent();
  if (/\|\s*:?-{3,}/.test(rawPipeTable || "")) {
    throw new Error(`${viewportName}: article page exposed raw Markdown table markers`);
  }
  const tableOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (tableOverflow > 1) throw new Error(`${viewportName}: markdown table caused horizontal overflow ${tableOverflow}px`);
}

async function verifyNoSourceLeak(page, viewportName, label) {
  const bodyText = await page.locator("body").textContent();
  if ((bodyText || "").includes("Get笔记")) {
    throw new Error(`${viewportName}: ${label} exposes source label`);
  }
}
