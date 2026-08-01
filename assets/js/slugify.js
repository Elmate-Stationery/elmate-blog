// assets/js/slugify.js
// Deliberately has zero imports so it can be safely used by both
// data/blogs.js and data/tags.js without creating a circular dependency.

export function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
