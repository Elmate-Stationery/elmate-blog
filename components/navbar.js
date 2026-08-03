// components/navbar.js
import { siteConfig } from "../data/config.js";
import { SITE_ROOT } from "../assets/js/site-root.js";

export function renderNavbar(activeHref = "") {
  const links = siteConfig.navigation.primary
    .map((link) => {
      const isActive = activeHref === link.href;
      return `
        <a href="${SITE_ROOT}${link.href}"
           class="px-1 py-2 text-sm ${isActive ? "text-[var(--pine)] border-b-2 border-[var(--pine)]" : "text-current border-b-2 border-transparent hover:text-[var(--pine)]"} transition-colors">
          ${link.label}
        </a>`;
    })
    .join("");

  const mobileLinks = siteConfig.navigation.primary
    .map(
      (link) => `
        <a href="${SITE_ROOT}${link.href}" class="block py-3 text-base border-b rule">${link.label}</a>`
    )
    .join("");

  return `
  <a href="#main-content" class="skip-link">Skip to content</a>
  <header class="sticky top-0 z-40 backdrop-blur bg-[var(--paper)]/90 dark:bg-[var(--paper-dark)]/90 border-b rule">
    <div id="reading-progress"></div>
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Primary">
      <a href="${SITE_ROOT}" class="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
        <span class="w-8 h-8 rounded flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--pine)]">${siteConfig.logoMark}</span>
        ${siteConfig.siteName}
      </a>

      <div class="hidden md:flex items-center gap-6">
        ${links}
      </div>

      <div class="flex items-center gap-2">
        <button id="search-trigger" aria-label="Open search" title="Search (/)"
          class="theme-toggle hover:border-[var(--pine)] transition-colors">
          <i data-lucide="search" class="w-4 h-4"></i>
        </button>
        <button id="theme-toggle" aria-label="Toggle theme" class="theme-toggle hover:border-[var(--pine)] transition-colors">
          <i data-lucide="sun" data-icon="sun" class="w-4 h-4"></i>
          <i data-lucide="moon" data-icon="moon" class="w-4 h-4 hidden"></i>
        </button>
        <button id="mobile-menu-trigger" aria-label="Open menu" aria-expanded="false" class="theme-toggle md:hidden">
          <i data-lucide="menu" class="w-4 h-4"></i>
        </button>
      </div>
    </nav>
  </header>

  <div id="mobile-drawer" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 search-backdrop" data-close-drawer></div>
    <div class="absolute right-0 top-0 bottom-0 w-72 bg-[var(--paper)] dark:bg-[var(--paper-dark)] p-6 shadow-xl">
      <div class="flex items-center justify-between mb-6">
        <span class="font-display font-semibold">Menu</span>
        <button data-close-drawer aria-label="Close menu" class="theme-toggle"><i data-lucide="x" class="w-4 h-4"></i></button>
      </div>
      ${mobileLinks}
    </div>
  </div>`;
}

export function mountNavbar(activeHref) {
  const el = document.getElementById("navbar-root");
  if (!el) return;
  el.innerHTML = renderNavbar(activeHref);

  const drawer = document.getElementById("mobile-drawer");
  const openBtn = document.getElementById("mobile-menu-trigger");
  const closeEls = drawer.querySelectorAll("[data-close-drawer]");
  openBtn?.addEventListener("click", () => {
    drawer.classList.remove("hidden");
    openBtn.setAttribute("aria-expanded", "true");
  });
  closeEls.forEach((elm) =>
    elm.addEventListener("click", () => {
      drawer.classList.add("hidden");
      openBtn?.setAttribute("aria-expanded", "false");
    })
  );

  // Reading progress bar
  const bar = document.getElementById("reading-progress");
  if (bar) {
    window.addEventListener("scroll", () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : "0%";
    });
  }
}
