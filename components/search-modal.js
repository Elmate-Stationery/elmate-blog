// components/search-modal.js
import { blogs } from "../data/blogs.js";
import { authorFor, categoryFor, debounce, escapeHtml } from "../assets/js/utils.js";

let fuseInstance = null;

async function getFuse() {
  if (fuseInstance) return fuseInstance;
  const Fuse = window.Fuse;
  fuseInstance = new Fuse(blogs, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "description", weight: 0.2 },
      { name: "author", weight: 0.1 },
      { name: "category", weight: 0.1 },
      { name: "tags", weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    includeMatches: true,
  });
  return fuseInstance;
}

function highlight(text, matches) {
  if (!matches || !matches.length) return escapeHtml(text);
  let result = "";
  let last = 0;
  matches
    .slice()
    .sort((a, b) => a[0] - b[0])
    .forEach(([start, end]) => {
      if (start < last) return;
      result += escapeHtml(text.slice(last, start));
      result += `<mark class="search-highlight">${escapeHtml(text.slice(start, end + 1))}</mark>`;
      last = end + 1;
    });
  result += escapeHtml(text.slice(last));
  return result;
}

export function renderSearchModal() {
  return `
  <div id="search-modal" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 search-backdrop" data-close-search></div>
    <div class="relative max-w-xl mx-auto mt-24 mx-4 bg-[var(--paper)] dark:bg-[var(--surface-dark)] rounded-lg shadow-2xl overflow-hidden">
      <div class="flex items-center gap-3 px-4 border-b rule">
        <i data-lucide="search" class="w-4 h-4 text-[var(--text-muted)]"></i>
        <input id="search-input" type="text" placeholder="Search articles, categories, tags…"
          class="flex-1 py-4 bg-transparent focus:outline-none text-sm" autocomplete="off" />
        <kbd class="text-xs font-mono text-[var(--text-muted)] border rule rounded px-1.5 py-0.5">Esc</kbd>
      </div>
      <div id="search-results" class="max-h-96 overflow-y-auto p-2"></div>
    </div>
  </div>`;
}

export function mountSearchModal() {
  const modal = document.getElementById("search-modal");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const trigger = document.getElementById("search-trigger");
  if (!modal) return;

  function open() {
    modal.classList.remove("hidden");
    input.value = "";
    results.innerHTML = emptyState("Start typing to search.");
    setTimeout(() => input.focus(), 30);
  }
  function close() {
    modal.classList.add("hidden");
  }

  function emptyState(msg) {
    return `<p class="text-sm text-center text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] py-10">${msg}</p>`;
  }

  trigger?.addEventListener("click", open);
  modal.querySelectorAll("[data-close-search]").forEach((el) => el.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      open();
    }
    if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
  });

  const runSearch = debounce(async (query) => {
    if (!query) {
      results.innerHTML = emptyState("Start typing to search.");
      return;
    }
    const fuse = await getFuse();
    const hits = fuse.search(query).slice(0, 8);
    if (!hits.length) {
      results.innerHTML = emptyState(`No results for "${escapeHtml(query)}". Try a broader term.`);
      return;
    }
    results.innerHTML = hits
      .map(({ item, matches }) => {
        const titleMatch = matches?.find((m) => m.key === "title");
        const author = authorFor(item);
        const category = categoryFor(item);
        return `
        <a href="blog.html?slug=${item.slug}" class="flex gap-3 p-3 rounded hover:bg-[var(--pine-light)] dark:hover:bg-white/5 transition-colors">
          <img src="${item.thumbnail}" alt="" loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&h=100&fit=crop'"
            class="w-12 h-12 rounded object-cover shrink-0" />
          <div class="min-w-0">
            <p class="text-sm font-medium line-clamp-1">${highlight(item.title, titleMatch?.indices)}</p>
            <p class="text-xs text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] mt-0.5">${category ? category.name : ""} ${author ? "· " + author.name : ""}</p>
          </div>
        </a>`;
      })
      .join("");
    if (window.lucide) window.lucide.createIcons();
  }, 180);

  input?.addEventListener("input", (e) => runSearch(e.target.value.trim()));
}
