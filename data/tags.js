// data/tags.js
export const tags = [
  { id: "tag-css", name: "CSS", slug: "css" },
  { id: "tag-javascript", name: "JavaScript", slug: "javascript" },
  { id: "tag-performance", name: "Performance", slug: "performance" },
  { id: "tag-design-systems", name: "Design Systems", slug: "design-systems" },
  { id: "tag-typography", name: "Typography", slug: "typography" },
  { id: "tag-static-sites", name: "Static Sites", slug: "static-sites" },
  { id: "tag-accessibility", name: "Accessibility", slug: "accessibility" },
  { id: "tag-seo", name: "SEO", slug: "seo" },
  { id: "tag-ecommerce", name: "E-commerce", slug: "ecommerce" },
  { id: "tag-writing", name: "Writing", slug: "writing" },
];

export function getTagBySlug(slug) {
  return tags.find((t) => t.slug === slug);
}
