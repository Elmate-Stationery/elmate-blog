// components/sidebar.js
import { getLatestBlogs } from "../data/blogs.js";
import { categories } from "../data/categories.js";
import { tags } from "../data/tags.js";
import { formatDate } from "../assets/js/utils.js";
import { SITE_ROOT } from "../assets/js/site-root.js";
import { postUrl } from "../assets/js/urls.js";

export function renderSidebar({ exclude = null } = {}) {
  const popular = getLatestBlogs(4).filter((b) => b.slug !== exclude);

  const popularItems = popular
    .map(
      (b) => `
      <a href="${postUrl(b.slug)}" class="flex gap-3 group py-2.5 border-b rule last:border-0">
        <img src="${SITE_ROOT}${b.thumbnail}" alt="" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&h=100&fit=crop'"
          class="w-14 h-14 rounded object-cover shrink-0" />
        <div class="min-w-0">
          <p class="text-sm font-medium leading-snug group-hover:text-[var(--pine)] transition-colors line-clamp-2">${b.title}</p>
          <p class="text-xs text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] font-mono mt-1">${formatDate(b.publishDate)}</p>
        </div>
      </a>`
    )
    .join("");

  const catItems = categories
    .map(
      (c) =>
        `<a href="${SITE_ROOT}category/?slug=${c.slug}" class="flex items-center justify-between py-2 text-sm hover:text-[var(--pine)] transition-colors border-b rule last:border-0">
          <span>${c.name}</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </a>`
    )
    .join("");

  const tagChips = tags.map((t) => `<a href="${SITE_ROOT}tag/?slug=${t.slug}" class="tag-chip">#${t.name}</a>`).join("");

  return `
  <aside class="space-y-10">
    <div>
      <h3 class="font-display text-sm font-semibold uppercase tracking-wide mb-3">Popular posts</h3>
      <div>${popularItems}</div>
    </div>
    <div>
      <h3 class="font-display text-sm font-semibold uppercase tracking-wide mb-3">Categories</h3>
      <div>${catItems}</div>
    </div>
    <div>
      <h3 class="font-display text-sm font-semibold uppercase tracking-wide mb-3">Popular tags</h3>
      <div class="flex flex-wrap gap-2">${tagChips}</div>
    </div>
  </aside>`;
}
