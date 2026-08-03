// components/blog-card.js
import {
  authorFor,
  categoryFor,
  formatDate,
  isBookmarked,
  tagsFor,
} from "../assets/js/utils.js";
import { escapeHtml } from "../assets/js/utils.js";
import { SITE_ROOT } from "../assets/js/site-root.js";

export function renderBlogCard(blog, { layout = "grid" } = {}) {
  const author = authorFor(blog);
  const category = categoryFor(blog);
  const bookmarked = isBookmarked(blog.slug);

  if (layout === "list") {
    return `
    <article class="blog-card rounded-lg overflow-hidden flex flex-col sm:flex-row" data-aos="fade-up">
      <a href="${SITE_ROOT}blog/?slug=${blog.slug}" class="sm:w-56 shrink-0 block aspect-video sm:aspect-square overflow-hidden bg-[var(--rule)]">
        <img src="${SITE_ROOT}${blog.thumbnail}" alt="" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=600&fit=crop'"
          class="w-full h-full object-cover" />
      </a>
      <div class="p-5 flex flex-col gap-2 flex-1">
        <div class="flex items-center gap-2">
          ${category ? `<a href="${SITE_ROOT}category/?slug=${category.slug}" class="badge">${category.name}</a>` : ""}
          ${blog.featured ? `<span class="badge badge-ochre">Featured</span>` : ""}
        </div>
        <h3 class="font-display text-lg font-semibold leading-snug">
          <a href="${SITE_ROOT}blog/?slug=${blog.slug}" class="hover:text-[var(--pine)] transition-colors">${escapeHtml(blog.title)}</a>
        </h3>
        <p class="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] line-clamp-2">${escapeHtml(blog.description)}</p>
        <div class="flex items-center gap-3 text-xs text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] mt-1 font-mono">
          <span>${author ? author.name : "Elmate Stationery Blogs"}</span>
          <span>&middot;</span>
          <span>${formatDate(blog.publishDate)}</span>
          <span>&middot;</span>
          <span>${blog.readingTime} min read</span>
        </div>
      </div>
    </article>`;
  }

  return `
  <article class="blog-card rounded-lg overflow-hidden flex flex-col h-full" data-aos="fade-up">
    <a href="${SITE_ROOT}blog/?slug=${blog.slug}" class="block aspect-video overflow-hidden bg-[var(--rule)] relative">
      <img src="${SITE_ROOT}${blog.thumbnail}" alt="" loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop'"
        class="w-full h-full object-cover" />
      ${blog.featured ? `<span class="badge badge-ochre absolute top-3 left-3">Featured</span>` : ""}
    </a>
    <div class="p-5 flex flex-col gap-2 flex-1">
      <div class="flex items-center justify-between">
        ${category ? `<a href="${SITE_ROOT}category/?slug=${category.slug}" class="badge">${category.name}</a>` : "<span></span>"}
        <button class="bookmark-btn text-[var(--text-muted)] hover:text-[var(--ochre)] transition-colors" data-slug="${blog.slug}" aria-label="Bookmark this article" aria-pressed="${bookmarked}">
          <i data-lucide="bookmark" class="w-4 h-4 ${bookmarked ? "fill-current text-[var(--ochre)]" : ""}"></i>
        </button>
      </div>
      <h3 class="font-display text-lg font-semibold leading-snug">
        <a href="${SITE_ROOT}blog/?slug=${blog.slug}" class="hover:text-[var(--pine)] transition-colors">${escapeHtml(blog.title)}</a>
      </h3>
      <p class="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] line-clamp-2 flex-1">${escapeHtml(blog.description)}</p>
      <div class="flex flex-wrap gap-1.5 mt-1">
        ${tagsFor(blog)
          .slice(0, 2)
          .map(
            (t) =>
              `<a href="${SITE_ROOT}tag/?slug=${t.slug}" class="tag-chip">#${escapeHtml(t.name)}</a>`,
          )
          .join("")}
      </div>
      <div class="flex items-center gap-3 text-xs text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] mt-2 pt-3 border-t rule font-mono">
        <span>${author ? author.name : "Elmate Stationery Blogs"}</span>
        <span>&middot;</span>
        <span>${formatDate(blog.publishDate)}</span>
        <span>&middot;</span>
        <span>${blog.readingTime} min</span>
      </div>
    </div>
  </article>`;
}

export function bindBookmarkButtons(root = document) {
  import("../assets/js/utils.js").then(({ toggleBookmark }) => {
    root.querySelectorAll(".bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const active = toggleBookmark(btn.dataset.slug);
        btn.setAttribute("aria-pressed", String(active));
        const icon = btn.querySelector("i, svg");
        if (icon) {
          icon.classList.toggle("fill-current", active);
          icon.classList.toggle("text-[var(--ochre)]", active);
        }
      });
    });
  });
}
