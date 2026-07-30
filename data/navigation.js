// data/navigation.js
// Re-exported separately from config.js so navigation can grow (e.g. mega-menus,
// sidebar-specific link sets) without bloating the core site config.
import { siteConfig } from "./config.js";

export const primaryNav = siteConfig.navigation.primary;

export const sidebarLinks = [
  { label: "Popular this week", href: "blogs.html?sort=popular" },
  { label: "All categories", href: "categories.html" },
  { label: "All tags", href: "tags.html" },
];
