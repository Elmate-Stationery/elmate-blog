// data/blogs.js
// Metadata only. Article body lives in content/<slug>.html
import { slugify } from "../assets/js/slugify.js";

export const blogs = [
  {
    id: "blog-stationery-items-a-complete-guide-to-essential-school-office-creative-supplies",
    slug: "stationery-items-a-complete-guide-to-essential-school-office-creative-supplies",
    title:
      "Stationery Items: A Complete Guide to Essential School, Office & Creative Supplies",
    subtitle: "",
    description: "",
    author: "author-najmul",
    category: "cat-Stationery Items",
    tags: ["Stationery"],
    coverImage:
      "public/images/blog/stationery-items-a-complete-guide-to-essential-school-office-creative-supplies-cover.jpg",
    thumbnail:
      "public/images/blog/stationery-items-a-complete-guide-to-essential-school-office-creative-supplies-cover.jpg",
    contentFile:
      "content/stationery-items-a-complete-guide-to-essential-school-office-creative-supplies.html",
    publishDate: "2026-08-09",
    updatedDate: "2026-08-09",
    readingTime: 11,
    featured: true,
    featuredOrder: 1,
    seoTitle:
      "Stationery Items: A Complete Guide to Essential School, Office & Creative Supplies",
    metaDescription: "",
    canonical: "",
    ogImage:
      "public/images/og/stationery-items-a-complete-guide-to-essential-school-office-creative-supplies-og.jpg",
  },
];

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogsByCategory(categoryId) {
  return blogs.filter((b) => b.category === categoryId);
}

export function getBlogsByTag(tagSlug) {
  return blogs.filter((b) => b.tags.some((t) => slugify(t) === tagSlug));
}

export function getFeaturedBlogs(limit = blogs.length) {
  return blogs
    .filter((b) => b.featured)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, limit);
}

export function getLatestBlogs(limit = blogs.length) {
  return [...blogs]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, limit);
}

export function getRelatedBlogs(blog, limit = 4) {
  const blogTagSlugs = blog.tags.map(slugify);
  return blogs
    .filter((b) => b.id !== blog.id)
    .map((b) => {
      let score = 0;
      if (b.category === blog.category) score += 2;
      score += b.tags.filter((t) => blogTagSlugs.includes(slugify(t))).length;
      return { b, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, z) => z.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.b);
}
