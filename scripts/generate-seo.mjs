// scripts/generate-seo.mjs
//
// Regenerates public/sitemap.xml and public/rss.xml from data/blogs.js.
// Run manually with: npm run generate:seo
// Run automatically by .github/workflows/deploy.yml on every push to main.
//
// This script is the ONLY part of the project that needs Node.js — the site
// itself remains a plain static site with no build step.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { blogs } from "../data/blogs.js";
import { siteConfig } from "../data/config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_URL = siteConfig.url.replace(/\/$/, "");

// Static, non-post pages to include in the sitemap.
// [path, changefreq, priority]
const STATIC_PAGES = [
  ["index.html", "weekly", "1.0"],
  ["blogs.html", "daily", "0.9"],
  ["categories.html", "weekly", "0.6"],
  ["tags.html", "weekly", "0.5"],
  ["about.html", "monthly", "0.4"],
  ["contact.html", "monthly", "0.4"],
  ["privacy-policy.html", "yearly", "0.2"],
  ["terms.html", "yearly", "0.2"],
];

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`).toUTCString();
}

function buildSitemap() {
  const staticUrls = STATIC_PAGES.map(
    ([p, freq, priority]) => `  <url>
    <loc>${SITE_URL}/${p}</loc>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  );

  const postUrls = [...blogs]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .map(
      (b) => `  <url>
    <loc>${SITE_URL}/blog.html?slug=${b.slug}</loc>
    <lastmod>${b.updatedDate || b.publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("\n")}
</urlset>
`;
}

function buildRss() {
  const items = [...blogs]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .map(
      (b) => `    <item>
      <title>${escapeXml(b.title)}</title>
      <link>${SITE_URL}/blog.html?slug=${b.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog.html?slug=${b.slug}</guid>
      <description>${escapeXml(b.metaDescription || b.description)}</description>
      <pubDate>${toRfc822(b.publishDate)}</pubDate>
    </item>`
    );

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.siteName)}</title>
    <link>${SITE_URL}/index.html</link>
    <description>${escapeXml(siteConfig.siteDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;
}

async function main() {
  const sitemap = buildSitemap();
  const rss = buildRss();

  const sitemapPath = path.join(ROOT, "public", "sitemap.xml");
  const rssPath = path.join(ROOT, "public", "rss.xml");

  await writeFile(sitemapPath, sitemap, "utf8");
  await writeFile(rssPath, rss, "utf8");

  console.log(`Generated public/sitemap.xml (${blogs.length} posts + ${STATIC_PAGES.length} static pages)`);
  console.log(`Generated public/rss.xml (${blogs.length} items)`);
}

main().catch((err) => {
  console.error("Failed to generate sitemap/RSS:", err);
  process.exit(1);
});
