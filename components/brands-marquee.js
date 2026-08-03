// components/brands-marquee.js
import { brands } from "../data/brands.js";
import { SITE_ROOT } from "../assets/js/site-root.js";
import { escapeHtml } from "../assets/js/utils.js";

function brandCard(b) {
  return `
    <a href="${b.url}" target="_blank" rel="noopener" class="brand-card" aria-label="${escapeHtml(b.title)} — opens in a new tab">
      <img src="${SITE_ROOT}${b.logo}" alt="${escapeHtml(b.title)}" loading="lazy"
        onerror="this.replaceWith(Object.assign(document.createElement('span'), { className: 'font-display font-semibold text-lg', textContent: '${escapeHtml(b.title)}' }))" />
      <span class="brand-card-slogan">${escapeHtml(b.slogan || "")}</span>
    </a>`;
}

export function renderBrandsSection() {
  if (!brands.length) return "";

  // Duplicate the list so the CSS marquee animation (translateX -50%) loops seamlessly.
  const track = [...brands, ...brands].map(brandCard).join("");

  return `
  <section class="max-w-6xl mx-auto px-4 sm:px-6 py-10" aria-label="Our other brands">
    <div class="mb-6" data-aos="fade-up">
      <span class="annotation font-mono text-xs">Beyond the blog</span>
      <h2 class="font-display text-2xl font-semibold mt-2">Our other brands</h2>
      <p class="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)] mt-1">A few other things we build and run.</p>
    </div>
    <div class="brand-marquee" data-aos="fade-up">
      <div class="brand-track">${track}</div>
    </div>
  </section>`;
}