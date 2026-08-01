// components/footer.js
import { siteConfig } from "../data/config.js";
import { categories } from "../data/categories.js";
import { tags } from "../data/tags.js";
import { renderNewsletter } from "./newsletter.js";
import { socialIconMarkup } from "../assets/js/social-icons.js";

export function renderFooter() {
  const year = new Date().getFullYear();

  const quickLinks = siteConfig.footerLinks.quickLinks
    .map(
      (l) =>
        `<li><a href="${l.href}" class="hover:text-[var(--pine)] transition-colors">${l.label}</a></li>`,
    )
    .join("");

  const catLinks = categories
    .slice(0, 5)
    .map(
      (c) =>
        `<li><a href="category.html?slug=${c.slug}" class="hover:text-[var(--pine)] transition-colors">${c.name}</a></li>`,
    )
    .join("");

  const tagChips = tags
    .slice(0, 8)
    .map(
      (t) =>
        `<a href="tag.html?slug=${t.slug}" class="tag-chip">#${t.name}</a>`,
    )
    .join("");

  const socialIcons = [
    ["github", siteConfig.social.github],
    ["twitter", siteConfig.social.twitter],
    ["linkedin", siteConfig.social.linkedin],
    ["facebook", siteConfig.social.facebook],
    ["rss", siteConfig.social.rss],
  ]
    .filter(([, href]) => href)
    .map(
      ([icon, href]) =>
        `<a href="${href}" aria-label="${icon}" class="theme-toggle hover:border-[var(--pine)] transition-colors">${socialIconMarkup(icon)}</a>`,
    )
    .join("");

  return `
  <footer class="border-t rule mt-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      ${renderNewsletter()}

      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mt-14">
        <div class="col-span-2">
          <a href="index.html" class="flex items-center gap-2 font-display font-semibold text-lg mb-3">
            <span class="w-8 h-8 rounded flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--pine)]">${siteConfig.logoMark}</span>
            ${siteConfig.siteName}
          </a>
          <p class="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] max-w-xs">${siteConfig.siteDescription}</p>
          <div class="flex gap-2 mt-4">${socialIcons}</div>
        </div>

        <div>
          <h3 class="font-display text-sm font-semibold mb-3 uppercase tracking-wide">Quick Links</h3>
          <ul class="space-y-2 text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)]">${quickLinks}</ul>
        </div>

        <div>
          <h3 class="font-display text-sm font-semibold mb-3 uppercase tracking-wide">Categories</h3>
          <ul class="space-y-2 text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)]">${catLinks}</ul>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-2">${tagChips}</div>

      <div class="mt-10 pt-6 border-t rule flex flex-col sm:flex-row justify-between gap-2 text-xs text-[var(--text-muted)] dark:text-[var(--text-muted-dark)]">
        <span>&copy; ${year} <a href="https://www.elmatestationery.com" rel="noopener">Elmate Stationery</a>. All rights reserved.</span>
      </div>
    </div>
  </footer>`;
}

export function mountFooter() {
  const el = document.getElementById("footer-root");
  if (!el) return;
  el.innerHTML = renderFooter();
  import("./newsletter.js").then((m) => m.initNewsletter());
}
