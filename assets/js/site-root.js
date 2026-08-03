// assets/js/site-root.js
//
// Resolves the absolute URL of the site's root directory at runtime.
// This file always lives at <site-root>/assets/js/site-root.js, so
// walking up two directories from its own URL always lands on the site
// root — regardless of how deeply nested the page that imported it is,
// and regardless of what path prefix the host serves the site under
// (e.g. a GitHub Pages project subpath like /elmate-blog/, a local dev
// server at http://127.0.0.1:5500/, or a custom domain at the true root).
//
// Use this instead of hardcoding "/some/path" (breaks under a subpath)
// or "../../some/path" (breaks depending on the current page's depth).

export const SITE_ROOT = new URL("../../", import.meta.url).href;
