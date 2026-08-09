// scripts/prerender.mjs
//
// Generates a static HTML page per post at blog/<slug>/index.html.
//
// Why: the article page builds its <title>, meta description, canonical and
// Open Graph tags with JavaScript. Google can render JS, but social crawlers
// (Facebook, LinkedIn, Slack, WhatsApp, X) do not — so shared links showed no
// title and no preview image. Prerendering bakes those tags into the HTML and
// inlines the article body, so crawlers and no-JS visitors get real content.
//
// The page still loads the same module script afterwards, which mounts the
// navbar/footer, builds the TOC, related posts, share buttons, etc. The legacy
// blog/?slug=<slug> URL keeps working — nothing is removed.
//
// Run with: npm run prerender  (also part of `npm run build`)

import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { blogs } from "../data/blogs.js";
import { siteConfig } from "../data/config.js";
import { authors } from "../data/authors.js";
import { categories } from "../data/categories.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_URL = siteConfig.url.replace(/\/$/, "");
const TEMPLATE = path.join(ROOT, "blog", "index.html");

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Absolute URL for an asset path stored in data (e.g. "public/images/...").
function absUrl(p) {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  return `${SITE_URL}/${String(p).replace(/^\//, "")}`;
}

function buildSeoBlock(blog) {
  const author = authors.find((a) => a.id === blog.author);
  const category = categories.find((c) => c.id === blog.category);
  const title = `${blog.seoTitle || blog.title} — ${siteConfig.siteName}`;
  const desc = blog.metaDescription || blog.description || "";
  const canonical = blog.canonical || `${SITE_URL}/blog/${blog.slug}/`;
  const image = absUrl(blog.ogImage || blog.coverImage);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: desc,
    author: { "@type": "Person", name: author?.name || siteConfig.siteName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      logo: { "@type": "ImageObject", url: absUrl(siteConfig.logo) },
    },
    datePublished: blog.publishDate,
    dateModified: blog.updatedDate || blog.publishDate,
    image,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(category ? { articleSection: category.name } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
  };

  const seo = `<title id="page-title">${escapeHtml(title)}</title>
    <meta id="meta-description" name="description" content="${escapeHtml(desc)}" />
    <link id="canonical-link" rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${escapeHtml(siteConfig.siteName)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta id="og-title" property="og:title" content="${escapeHtml(blog.title)}" />
    <meta id="og-desc" property="og:description" content="${escapeHtml(desc)}" />
    <meta id="og-image" property="og:image" content="${escapeHtml(image)}" />
    <meta property="article:published_time" content="${escapeHtml(blog.publishDate)}" />
    <meta property="article:modified_time" content="${escapeHtml(blog.updatedDate || blog.publishDate)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(blog.title)}" />
    <meta name="twitter:description" content="${escapeHtml(desc)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`;

  const schemaScript = `<script type="application/ld+json" id="article-schema">
${JSON.stringify(schema, null, 6)}
    </script>`;

  return { seo, schemaScript };
}

async function main() {
  const template = await readFile(TEMPLATE, "utf8");

  // Replace ONLY the SEO block: from <title> through the twitter:card meta.
  // Everything after it (favicon, preconnects, fonts, stylesheets) must be
  // preserved verbatim — an earlier version over-reached here and stripped
  // the stylesheets, leaving unstyled pages.
  const TWITTER_CARD = '<meta name="twitter:card" content="summary_large_image" />';
  const seoStart = template.indexOf("<title");
  const twitterIdx = template.indexOf(TWITTER_CARD);
  if (seoStart < 0 || twitterIdx < 0) {
    throw new Error("prerender: could not locate the SEO block in the template");
  }
  const seoEnd = twitterIdx + TWITTER_CARD.length;

  const SCHEMA_TAG = '<script type="application/ld+json" id="article-schema"></script>';
  if (!template.includes(SCHEMA_TAG)) {
    throw new Error("prerender: could not locate the article-schema script tag");
  }

  let written = 0;
  for (const blog of blogs) {
    const contentPath = path.join(ROOT, blog.contentFile);
    if (!existsSync(contentPath)) {
      console.warn(`  ! skipped ${blog.slug} — missing ${blog.contentFile}`);
      continue;
    }
    const body = await readFile(contentPath, "utf8");

    const { seo, schemaScript } = buildSeoBlock(blog);
    let page =
      template.slice(0, seoStart) + seo + template.slice(seoEnd);
    page = page.replace(SCHEMA_TAG, schemaScript);

    // Inline the article body so crawlers see real content.
    page = page.replace(
      /(<div\s+id="article-content"[^>]*>)(\s*)(<\/div>)/,
      (_m, open, _ws, close) => `${open}\n${body}\n            ${close}`,
    );

    // Tell the page which post it is (no query string on a prerendered URL).
    page = page.replace(
      /<script type="module">/,
      `<script>window.__PRERENDER_SLUG__ = ${JSON.stringify(blog.slug)};</script>\n    <script type="module">`,
    );

    // Re-root relative paths for the extra directory level.
    page = page.replace(/"\.\.\//g, '"../../');

    const outDir = path.join(ROOT, "blog", blog.slug);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), page, "utf8");
    written++;
  }

  console.log(`Prerendered ${written} post page(s) to blog/<slug>/index.html`);
}

main().catch((err) => {
  console.error("Failed to prerender posts:", err);
  process.exit(1);
});
