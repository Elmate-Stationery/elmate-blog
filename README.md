# Elmate Stationery Blogs — Static Blog

A fast, static, SEO-friendly blog built with plain HTML5, Tailwind CSS, and vanilla JavaScript (ES6 modules). No backend, no database, no build step. Designed to be hosted for free on GitHub Pages.

---

## 1. Project Overview

**What it is:** A content-driven blog website. All content (posts, authors, categories, tags, site settings) lives in plain JavaScript data files and Markdown files. There is no CMS, no server, and no compilation step — you edit files directly and the site updates immediately.

**Tech stack:**

| Layer    | Choice                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------- |
| Markup   | HTML5                                                                                             |
| Styling  | Tailwind CSS (CDN build) + a small custom design-token stylesheet                                 |
| Behavior | Vanilla JavaScript, ES6 modules (`import`/`export`) — no framework, no bundler                    |
| Content  | JavaScript objects (`data/*.js`) for metadata, Markdown files (`content/*.md`) for article bodies |
| Hosting  | GitHub Pages (or any static file host)                                                            |

**Libraries (all loaded via CDN — nothing to `npm install`):**

- **Tailwind CSS** — utility-first styling
- **Marked.js** — renders Markdown into HTML
- **Highlight.js** — syntax highlighting for code blocks
- **AOS** — scroll-reveal animations
- **Lucide** — icon set
- **Fuse.js** — fuzzy, typo-tolerant client-side search

**Design system:** Space Grotesk (headings/UI), Source Serif 4 (article body), IBM Plex Mono (metadata/code) on an ink/paper palette with a pine-green primary accent and ochre secondary accent. The signature visual element is the **margin rail** on article pages — a ruled sidebar of monospace annotations styled after handwritten notebook notes.

---

## 2. Project Structure

Pages use **clean URLs** — each page lives at `<name>/index.html` instead of `<name>.html`, so it's reachable at `/name/` with no file extension (see Section 3.1 for why).

```
Elmate Stationery Blogs/
│
├── index.html               Home page (stays at root)
├── 404.html                 Custom 404 page (must stay at root — GitHub Pages requirement)
├── blogs/index.html          All-articles listing (search, filter, sort, paginate)   → /blogs/
├── blog/index.html            Single article (reads ?slug=... from the URL)          → /blog/?slug=...
├── categories/index.html    All categories                                          → /categories/
├── category/index.html       Single category (reads ?slug=...)                       → /category/?slug=...
├── tags/index.html           Tag cloud                                               → /tags/
├── tag/index.html             Single tag (reads ?slug=...)                            → /tag/?slug=...
├── search/index.html         Dedicated search page                                   → /search/
├── about/index.html          About page                                              → /about/
├── contact/index.html         Contact page + form                                     → /contact/
├── privacy-policy/index.html                                                          → /privacy-policy/
├── terms/index.html                                                                    → /terms/
│
├── assets/
│   ├── css/main.css          Design tokens (colors, type, spacing) + custom component styles
│   ├── js/
│   │   ├── layout.js          Boots every page: mounts navbar/footer/search, theme, icons, animations
│   │   ├── theme.js            Light/dark/system theme logic (persisted to localStorage)
│   │   ├── utils.js            Shared helpers: querystring, date formatting, bookmarks, debounce
│   │   ├── slugify.js          Turns a tag name into a URL slug (used by data/tags.js)
│   │   ├── site-root.js        Resolves the site's root URL at runtime — see Section 3.1
│   │   └── social-icons.js     Monogram badges for GitHub/X/LinkedIn/Facebook (Lucide dropped these)
│   ├── fonts/, icons/, vendors/   Empty — reserved if you later choose to self-host assets instead of using CDNs
│
├── components/                Render functions that return HTML strings (or mount into the DOM)
│   ├── navbar.js
│   ├── footer.js
│   ├── sidebar.js
│   ├── blog-card.js
│   ├── pagination.js
│   ├── search-modal.js
│   └── newsletter.js
│
├── data/                      All site content and configuration
│   ├── config.js                Site name, SEO defaults, social links, nav, footer links, analytics, theme default
│   ├── blogs.js                  Post metadata (title, slug, author, category, tags, dates, image paths, etc.)
│   ├── authors.js
│   ├── categories.js
│   └── tags.js                   Auto-derived from data/blogs.js — don't hand-edit, see Section 6
│   └── navigation.js
│
├── content/                    Article bodies, one Markdown file per post
│   └── your-post-slug.md
│
├── public/
│   ├── favicon/                 favicon.png, apple-touch-icon.png, icon-192.png, icon-512.png
│   ├── images/
│   │   ├── logo/, authors/, categories/, blog/, og/
│   ├── robots.txt
│   ├── sitemap.xml              Auto-generated — see Section 7, don't hand-edit
│   ├── rss.xml                    Auto-generated — see Section 7, don't hand-edit
│   └── site.webmanifest / manifest.json
│
├── scripts/
│   └── generate-seo.mjs        Regenerates sitemap.xml + rss.xml from data/blogs.js
│
├── .github/workflows/
│   └── deploy.yml               Runs generate-seo.mjs then deploys to GitHub Pages on every push
│
├── package.json                 Only needed to run the generator script (no site build step)
└── README.md
```

---

## 3. How the Site Works (Architecture)

1. Every HTML page is a static shell with two empty mount points — `#navbar-root` and `#footer-root` — plus page-specific content containers (e.g. `#blog-grid`, `#article-content`).
2. A `<script type="module">` block at the bottom of each page imports `assets/js/layout.js` and calls `bootLayout()`, which renders the navbar, footer, and search modal, then initializes theme, icons, and animations.
3. The page then imports whatever `data/*.js` it needs (e.g. `blogs.js`) and whatever `components/*.js` it needs (e.g. `blog-card.js`), and renders content into the page's containers using plain DOM/`innerHTML` calls.
4. List/detail pages (`blog/`, `category/`, `tag/`) read an identifier from the URL query string (`?slug=...`) with the `qs()` helper in `utils.js`, look up the matching record in `data/`, and render it.
5. Article bodies are not stored as HTML — `blog/index.html` `fetch()`s the Markdown file referenced in the post's metadata (`markdown: "content/your-post.md"`) and renders it client-side with Marked.js.

Because this relies on `fetch()` and ES module imports, **the site must be served over HTTP** — opening files directly via `file://` will not work (see Section 4).

### 3.1 How clean URLs work (`/blogs/` instead of `/blogs.html`)

Every page other than the homepage and `404.html` lives at `<name>/index.html`. Any static file server — Live Server, `python3 -m http.server`, and GitHub Pages all included — automatically serves a folder's `index.html` when that folder is requested, so `/blogs/` just works with no server configuration.

The tricky part is that shared components (navbar, footer, blog cards, sidebar, etc.) render identical HTML regardless of which page — root-level or nested one level deep — is currently using them. A hardcoded relative link like `"blogs/"` would be correct from `index.html` but wrong from inside `about/index.html` (it'd try to load `about/blogs/`, which doesn't exist).

`assets/js/site-root.js` solves this without hardcoding anything:

```js
export const SITE_ROOT = new URL("../../", import.meta.url).href;
```

Since this file always lives at `<site-root>/assets/js/site-root.js`, walking up two directories from its own resolved URL always lands back on the site root — correctly, regardless of the current page's depth, and regardless of whether the site is served from a local dev server, a GitHub Pages _project_ subpath (e.g. `/elmate-blog/`), or a custom domain at the true root. Every shared component imports `SITE_ROOT` and builds links like `` `${SITE_ROOT}blogs/` `` instead of hardcoding a path.

Image paths in `data/blogs.js`, `data/categories.js`, and `data/authors.js` follow the same pattern — they're stored _without_ a leading slash (e.g. `"public/images/blog/x.jpg"`, not `"/public/images/blog/x.jpg"`) and get prefixed with `SITE_ROOT` wherever they're rendered. A leading-slash path would break under a GitHub Pages project subpath, since `/public/...` resolves from the domain root, not the repo's subpath.

---

## 4. Step-by-Step: Running Locally

1. Make sure you have Node.js or Python installed (either works — you only need _something_ that can serve static files).
2. From the project root, start a local server:

   ```bash
   # Option A — Node
   npx serve .

   # Option B — Python
   python3 -m http.server 8000

   # Option C — VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

3. Open the printed URL in your browser (typically `http://localhost:3000` or `http://localhost:8000`).
4. Navigate the site as a visitor would — click through links rather than typing `.html` paths, since those no longer exist. Any edits to `data/*.js`, `content/*.md`, or `assets/css/main.css` are reflected on a page refresh — no build/compile step.

---

## 5. Step-by-Step: Deploying to GitHub Pages

This project deploys via a **GitHub Actions workflow** (`.github/workflows/deploy.yml`), not the plain "deploy from branch" option — this is what lets `sitemap.xml`/`rss.xml` regenerate automatically (see Section 7).

1. Update `data/config.js` → `siteConfig.url` to your final site URL (it feeds canonical tags, Open Graph data, and the sitemap/RSS generator).
2. Create a new GitHub repository and push this project to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. In the repository on GitHub: **Settings → Pages → Source** → select **"GitHub Actions"** (not "Deploy from a branch").
4. That's it — pushing to `main` triggers the workflow, which regenerates the sitemap/RSS and publishes the site. Check the **Actions** tab to watch it run. The site will be live at `https://<your-username>.github.io/<your-repo>/` within a minute or two.
5. Re-run step 1 if your repo name changes, since GitHub Pages URLs are path-based unless you're using a custom domain or a `username.github.io` root repo.

---

## 6. Step-by-Step: Publishing a New Post

1. Write the article body as Markdown and save it to `content/your-post-slug.md`.
2. Open `data/blogs.js` and copy an existing post object as a template. Fill in:
   - `slug` — must match the URL you'll link to (`blog/?slug=your-post-slug`)
   - `title`, `subtitle`, `description`
   - `author` — must match an existing `id` in `data/authors.js` (or add a new author there first)
   - `category` — must match an existing `id` in `data/categories.js`
   - `tags` — array of plain tag names, e.g. `["JavaScript", "Performance"]`. Tags are **not** a fixed list — any name you type here is picked up automatically (see the note below).
   - `coverImage`, `thumbnail` — paths under `public/images/blog/`
   - `markdown` — path to the file from step 1, e.g. `"content/your-post-slug.md"`
   - `publishDate`, `updatedDate`, `readingTime` (minutes, estimated)
   - `featured` / `featuredOrder` — set `featured: true` to surface it on the home page
   - `seoTitle`, `metaDescription`, `ogImage` — used for `<title>`, meta description, and social share cards
3. Add the referenced images to `public/images/blog/`.
4. _(No manual step needed)_ `sitemap.xml` and `rss.xml` regenerate automatically on your next deploy — see Section 7.
5. Refresh the site locally — the new post appears automatically in `blogs/`, its category page, its tag pages, search results, and the home page (if featured/latest).

**Adding a new author or category:** add an object to `data/authors.js` or `data/categories.js` following the existing pattern before referencing its `id` from a post.

**Tags work differently — they're automatic.** `data/tags.js` doesn't hold a hand-maintained list; it scans every post in `data/blogs.js` and builds the tag list, tag cloud, and per-tag pages from whatever names actually appear there. Type a new tag directly into a post's `tags` array and it just works — no registration step, no ID to look up. Tag URLs (`tag/?slug=...`) are generated by slugifying the tag name (e.g. `"E-commerce"` → `ecommerce`), so keep tag names reasonably consistent in spelling/casing across posts — `"SEO"` and `"seo"` will collapse to the same tag page, but `"SEO"` and `"Search Engine Optimization"` will not.

---

## 7. Auto-Updating Sitemap & RSS

`public/sitemap.xml` and `public/rss.xml` are **generated files** — don't hand-edit them, they get overwritten on the next deploy.

**How it works:**

- `scripts/generate-seo.mjs` reads every post from `data/blogs.js` (plus a fixed list of static pages) and writes fresh `sitemap.xml` and `rss.xml` files.
- `.github/workflows/deploy.yml` runs this script automatically on every push to `main`, _before_ deploying to GitHub Pages. So the moment you commit a new post to `data/blogs.js`, the next deploy ships an updated sitemap and RSS feed — no manual step required.
- This requires **Settings → Pages → Source = "GitHub Actions"** (set once — see Section 5, step 3). The older "deploy from branch" method serves the raw repo contents as-is and would skip generation entirely.

**Run it manually** any time (e.g. to preview the output locally before pushing) with:

```bash
npm run generate:seo
```

This only needs Node.js — nothing else in the project requires a `node_modules` install. The generated files always reflect exactly what's in `data/blogs.js` at the time the script runs, so there's no risk of the sitemap drifting out of sync with real content.

---

## 8. Step-by-Step: Customizing the Site

**Site-wide settings** (name, logo, tagline, SEO defaults, social links, navigation, footer links, contact info, pagination size, default theme, analytics IDs, Giscus comment settings) are all controlled from one file:

```
data/config.js
```

**Visual design** (colors, fonts, spacing) is controlled by CSS custom properties at the top of:

```
assets/css/main.css
```

Change a token there (e.g. `--pine`, `--ochre`, `--font-display`) and it updates everywhere it's used. Tailwind utility classes handle layout throughout the HTML; bespoke, reused visual patterns (cards, badges, buttons, the margin-rail) are defined as named classes in this same file.

**Forms:** the newsletter form (in the footer) and the contact form work as static UI out of the box. To make them actually send submissions, set `siteConfig.contact.formspreeEndpoint` in `data/config.js` to a Formspree endpoint URL.

**Comments:** disabled by default. Enable by setting `giscus.enabled: true` in `data/config.js` and filling in your GitHub Discussions repo details.

---

## 9. Feature Reference

| Area                | Details                                                                                                                                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search              | Fuse.js fuzzy search; keyboard shortcut `/` opens the modal, `Esc` closes it; also available as filters on `blogs/` and as a full page at `search/`                                                                                                                                |
| Filtering & sorting | Category dropdown, tag chips, sort (newest/oldest/quickest read), grid/list view toggle, pagination — all on `blogs/`, state reflected in the URL query string                                                                                                                     |
| Article page        | Table of contents with scroll-spy highlighting, reading progress bar, clickable heading anchors, copy-code buttons on code blocks, share buttons (Facebook, X, LinkedIn, WhatsApp, Telegram, copy-link), related posts (by shared category/tags), prev/next navigation, author box |
| Personalization     | Light/dark/system theme (persisted in `localStorage`), bookmarked articles, recently viewed history — all stored client-side only                                                                                                                                                  |
| SEO                 | Per-page `<title>`/meta description, canonical URLs, Open Graph + Twitter Card tags, JSON-LD `Article`/`Blog` schema, `robots.txt`, `sitemap.xml`, `rss.xml`                                                                                                                       |
| Accessibility       | Semantic HTML, skip-to-content link, visible focus states, alt text on all images, `prefers-reduced-motion` support                                                                                                                                                                |
| Performance         | Lazy-loaded images, CDN-hosted libraries, debounced search input, no framework/bundle overhead                                                                                                                                                                                     |

---

## 10. Notes on Placeholder Content

- All six sample posts, author bios, and category descriptions are placeholder content — replace with your own via the workflow in Section 6.
- Images under `public/images/` are generated placeholders (solid color blocks labeled in the site's palette). File paths are already wired up in `data/blogs.js`, `data/categories.js`, and `data/authors.js` — just replace the image files at those same paths.
- `data/config.js` → `siteConfig.url` currently holds a placeholder GitHub Pages URL; update it before deploying (see Section 5, step 1).

---

## 11. Troubleshooting

| Symptom                                                                          | Likely cause                                                                                                                                               |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blank page, console errors about CORS/modules                                    | Site opened via `file://` instead of a local server — see Section 4                                                                                        |
| New post doesn't appear                                                          | Check the `slug` is unique, and that `author`/`category`/`tag` IDs referenced in `data/blogs.js` actually exist in their respective data files             |
| Broken image                                                                     | File path in `data/blogs.js` (or `authors.js`/`categories.js`) doesn't match the actual file in `public/images/`                                           |
| Search returns nothing it should find                                            | Fuse.js searches `title`, `description`, `author`, `category`, and `tags` fields only — not article body text                                              |
| Newsletter/contact form shows a "would be subscribed" message instead of sending | No Formspree endpoint configured — see Section 8                                                                                                           |
| Sitemap/RSS not updating after deploy                                            | Confirm **Settings → Pages → Source** is set to **"GitHub Actions"**, not "Deploy from a branch" — check the Actions tab for the workflow run and its logs |
