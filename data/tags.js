// data/tags.js
//
// Tags are NOT hand-maintained here. They're derived automatically from
// whatever strings appear in each post's `tags` array in data/blogs.js.
//
// To introduce a new tag: just type it into a post's `tags` array
// (e.g. tags: ["JavaScript", "Web Performance"]). It will automatically
// appear in the tag cloud, sidebar, footer, filters, and get its own
// tag.html page — no need to register it anywhere first.

import { blogs } from "./blogs.js";
import { slugify } from "../assets/js/slugify.js";

function buildTags() {
  const bySlug = new Map(); // slug -> { id, name, slug }
  blogs.forEach((blog) => {
    (blog.tags || []).forEach((name) => {
      const slug = slugify(name);
      if (!slug) return;
      if (!bySlug.has(slug)) {
        bySlug.set(slug, { id: slug, name: name.trim(), slug });
      }
    });
  });
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export const tags = buildTags();

export function getTagBySlug(slug) {
  return tags.find((t) => t.slug === slug);
}