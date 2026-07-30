# Marginalia — Static Blog (GitHub Pages)

A fast, dependency-free, SEO-friendly blog. No build step, no backend, no database —
just HTML, Tailwind CSS (via CDN), and vanilla JavaScript ES6 modules. Deploys straight
to GitHub Pages.

## Quick start

1. **Preview locally.** Because this uses ES6 modules (`fetch` for markdown, `import`/`export`),
   you need to serve the files over HTTP — opening `index.html` directly (`file://`) will not work.

   ```bash
   # any static server works, e.g.:
   npx serve .
   # or
   python3 -m http.server 8000
   ```

   Then open `http://localhost:8000`.

2. **Deploy to GitHub Pages.**
   - Push this folder to a GitHub repository.
   - Repo → Settings → Pages → Source: deploy from the `main` branch, root folder.
   - Your site will be live at `https://<username>.github.io/<repo>/`.
   - Update `data/config.js` → `siteConfig.url` to match your final URL (used for canonical
     tags, Open Graph, and RSS).

## Project structure

```
index.html, blogs.html, blog.html, ...   → pages (see spec)
assets/css/main.css                       → design tokens + custom styles
assets/js/                                → theme, layout bootstrap, shared utils
components/                               → reusable JS render functions (navbar, footer,
                                             blog-card, pagination, search-modal, sidebar,
                                             newsletter)
data/                                     → all site content lives here as JS objects:
                                             blogs.js, authors.js, categories.js, tags.js,
                                             navigation.js, config.js
content/*.md                              → article bodies, one markdown file per post,
                                             referenced by data/blogs.js → markdown field
public/                                   → images, favicon, robots.txt, sitemap.xml,
                                             rss.xml, manifest
```

## Publishing a new post

1. Add a markdown file to `content/your-post-slug.md`.
2. Add a metadata object to `data/blogs.js` (copy an existing entry as a template) —
   set `slug`, `title`, `author`, `category`, `tags`, image paths, dates, and
   `markdown: "content/your-post-slug.md"`.
3. Add any new author/category/tag to their respective `data/*.js` file first if they
   don't already exist.
4. Add images to `public/images/blog/` at the paths referenced in the post's metadata.
5. Add a `<url>` entry to `public/sitemap.xml` and an `<item>` to `public/rss.xml` (optional
   but recommended for SEO).

No build step is required — the site picks up new posts automatically on next page load.

## Customizing the design

Everything site-wide (name, logo, SEO defaults, social links, nav, footer links, pagination
size, theme default, analytics IDs, Giscus comments) is controlled from **`data/config.js`**.

Design tokens (color, type, spacing) are defined as CSS custom properties at the top of
**`assets/css/main.css`** — change values there to re-theme the entire site. Tailwind utility
classes are used throughout for layout; bespoke components (cards, badges, buttons, the
margin-rail signature element on article pages) are defined in that same file.

## Libraries used (all via CDN, no npm install needed)

- **Tailwind CSS** (CDN build) — utility-first styling
- **Marked.js** — markdown → HTML rendering
- **Highlight.js** — code syntax highlighting
- **AOS** — scroll-reveal animations
- **Lucide** — icon set
- **Fuse.js** — fuzzy client-side search (used in the nav search modal, `/blogs.html`
  filters, and `/search.html`)

## Features implemented

- Fully responsive, mobile-first, light/dark/system theme (persisted in `localStorage`)
- Instant fuzzy search (keyboard shortcut `/` to open, `Esc` to close) with match highlighting
- Category and tag filtering, sorting, grid/list view toggle, and pagination on `/blogs.html`
- Full single-post experience: table of contents with scroll-spy, reading progress bar,
  copyable heading anchors, copy-code buttons, share buttons (Facebook/X/LinkedIn/WhatsApp/
  Telegram/copy-link), related posts, prev/next navigation, author box
- Bookmarks and reading history stored in `localStorage`
- SEO: per-page meta title/description, canonical URLs, Open Graph + Twitter Card tags,
  JSON-LD `Article`/`Blog` schema, `robots.txt`, `sitemap.xml`, `rss.xml`
- Accessibility: semantic HTML, skip-to-content link, visible focus states, alt text on all
  images, reduced-motion support
- Newsletter and contact forms (UI works standalone; wire up a Formspree endpoint in
  `data/config.js` → `contact.formspreeEndpoint` to make them functional)
- Giscus (GitHub Discussions) comments are stubbed and ready to enable via `data/config.js`
  → `giscus`

## Notes on placeholder content

- All blog post content, author bios, and category descriptions are sample content —
  replace with your own.
- Images in `public/images/` are generated placeholders (solid-color labels in the site's
  palette). Replace them with real photography/illustrations; file paths are already wired
  up in `data/blogs.js`, `data/categories.js`, and `data/authors.js`.
- `data/config.js` → `siteConfig.url` uses a placeholder GitHub Pages URL — update it before
  deploying, since it feeds canonical tags and Open Graph data.
