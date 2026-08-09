// assets/js/urls.js
//
// Single source of truth for post URLs.
//
// Posts are prerendered to static pages at blog/<slug>/index.html by
// scripts/prerender.mjs, so the canonical URL of a post is blog/<slug>/.
// The older query-string form (blog/?slug=<slug>) still works — the article
// page reads either — so any previously shared links keep resolving.

import { SITE_ROOT } from "./site-root.js";

export function postUrl(slug) {
  return `${SITE_ROOT}blog/${slug}/`;
}
