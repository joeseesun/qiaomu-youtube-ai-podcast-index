const state = {
  podcasts: [],
  metadata: null,
  category: "all",
  audience: "all",
  query: ""
};

const categoryLabels = {
  all: "全部",
  featured: "精选",
  engineering: "工程实战",
  research: "研究前沿",
  founders: "创业产品",
  news: "新闻综述",
  business: "商业落地",
  culture: "社会文化"
};

const audienceLabels = {
  all: "全部人群",
  engineer: "工程师",
  founder: "创业者",
  product: "产品人",
  researcher: "研究者",
  executive: "管理者",
  beginner: "入门者"
};

const grid = document.querySelector("#podcast-grid");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search");
const resetButton = document.querySelector("#reset-filters");
const categoryFilters = document.querySelector("#category-filters");
const audienceFilters = document.querySelector("#audience-filters");

async function init() {
  try {
    const response = await fetch("data/podcasts.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }
    const data = await response.json();
    state.podcasts = data.podcasts;
    state.metadata = data.metadata;
    renderStats();
    renderFilters();
    render();
  } catch (error) {
    resultCount.textContent = "索引加载失败，请稍后刷新。";
    grid.innerHTML = `<p class="card-summary">${escapeHtml(error.message)}</p>`;
  }
}

function renderStats() {
  document.querySelector("#stat-count").textContent = String(state.podcasts.length);
  document.querySelector("#stat-updated").textContent = formatDate(state.metadata.updatedAt);
}

function renderFilters() {
  const categories = ["all", ...state.metadata.categories];
  const audiences = ["all", ...state.metadata.audiences];
  renderButtonGroup("#category-filters", categories, categoryLabels, "category");
  renderButtonGroup("#audience-filters", audiences, audienceLabels, "audience");
}

function renderButtonGroup(selector, values, labels, key) {
  const wrap = document.querySelector(selector);
  wrap.innerHTML = values.map((value) => {
    const pressed = state[key] === value ? "true" : "false";
    return `<button class="filter-button" type="button" data-${key}="${value}" aria-pressed="${pressed}">${labels[value] || value}</button>`;
  }).join("");
}

function render() {
  const query = normalize(state.query);
  const filtered = state.podcasts.filter((podcast) => {
    const matchesCategory = state.category === "all" || podcast.category === state.category || podcast.featured && state.category === "featured";
    const matchesAudience = state.audience === "all" || podcast.audiences.includes(state.audience);
    const haystack = normalize([
      podcast.title,
      podcast.hosts,
      podcast.summary,
      podcast.why,
      podcast.tags.join(" "),
      podcast.audiences.join(" ")
    ].join(" "));
    return matchesCategory && matchesAudience && (!query || haystack.includes(query));
  });

  resultCount.textContent = filtered.length === state.podcasts.length
    ? `共 ${filtered.length} 个 AI 播客`
    : `找到 ${filtered.length} 个匹配项，共 ${state.podcasts.length} 个`;
  emptyState.hidden = filtered.length > 0;
  grid.innerHTML = filtered.map(renderCard).join("");
}

function renderCard(podcast, index) {
  const detailUrl = `podcasts/${encodeURIComponent(podcast.id)}/`;
  const delay = Math.min(index, 12) * 35;
  const badges = [
    podcast.featured ? `<span class="badge featured">精选</span>` : "",
    `<span class="badge">${categoryLabels[podcast.category]}</span>`,
    `<span class="badge">${podcast.language}</span>`
  ].filter(Boolean).join("");

  const tags = podcast.tags.slice(0, 5).map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");

  return `
    <article class="podcast-card" data-id="${escapeHtml(podcast.id)}" style="--stagger:${delay}ms">
      <a class="card-media card-detail-link" href="${detailUrl}" aria-label="查看 ${escapeAttribute(podcast.title)} 详情页">
        <img src="${escapeAttribute(podcast.artworkUrl)}" alt="${escapeAttribute(podcast.title)} 封面" loading="${index < 6 ? "eager" : "lazy"}" decoding="async" referrerpolicy="no-referrer">
        <div class="badge-row">${badges}</div>
      </a>
      <div class="card-body">
        <div>
          <h3 class="card-title"><a href="${detailUrl}">${escapeHtml(podcast.title)}</a></h3>
          <p class="card-meta">${escapeHtml(podcast.hosts)} · ${escapeHtml(podcast.cadence)}</p>
        </div>
        <p class="card-summary">${escapeHtml(podcast.summary)}</p>
        <p class="card-why">${escapeHtml(podcast.why)}</p>
        <ul class="tag-list" aria-label="${escapeAttribute(podcast.title)} 标签">${tags}</ul>
        <div class="card-actions">
          <a class="primary-action" href="${detailUrl}">详情与往期</a>
          <a class="secondary-action" href="${escapeAttribute(podcast.youtubeUrl)}" target="_blank" rel="noopener">YouTube</a>
          <a class="secondary-action" href="${escapeAttribute(podcast.officialUrl)}" target="_blank" rel="noopener">官网</a>
          <a class="secondary-action" href="${escapeAttribute(podcast.appleUrl)}" target="_blank" rel="noopener">Apple</a>
        </div>
      </div>
    </article>
  `;
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

resetButton.addEventListener("click", () => {
  state.category = "all";
  state.audience = "all";
  state.query = "";
  searchInput.value = "";
  renderFilters();
  render();
});

categoryFilters.addEventListener("click", (event) => handleFilterClick(event, "category"));
audienceFilters.addEventListener("click", (event) => handleFilterClick(event, "audience"));

function handleFilterClick(event, key) {
  const button = event.target.closest("button");
  if (!button) return;
  state[key] = button.dataset[key];
  renderFilters();
  render();
}

const backdrop = document.querySelector("#modal-backdrop");
let activeModal = null;

document.querySelectorAll(".js-open-modal").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modal));
});

document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", closeModal);
});

backdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeModal) {
    closeModal();
  }
});

function openModal(id) {
  activeModal = document.querySelector(`#modal-${id}`);
  if (!activeModal) return;
  backdrop.hidden = false;
  activeModal.hidden = false;
  activeModal.querySelector(".modal-close").focus();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!activeModal) return;
  activeModal.hidden = true;
  backdrop.hidden = true;
  activeModal = null;
  document.body.style.overflow = "";
}

function normalize(value) {
  return value.toLowerCase().trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

init();
