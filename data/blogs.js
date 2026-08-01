// data/blogs.js
// Metadata only. Article body lives in content/<markdown>.md
import { slugify } from "../assets/js/slugify.js";

export const blogs = [
  {
    id: "blog-001",
    slug: "static-sites-still-win",
    title: "Static Sites Still Win in 2026",
    subtitle: "Why the boring stack keeps beating the fashionable one",
    description:
      "A case for static HTML, CSS, and vanilla JS for content-driven sites — and when you actually need more.",
    author: "author-najmul",
    category: "cat-engineering",
    tags: ["Static Sites", "Performance", "JavaScript"],
    coverImage: "/elmate-blog/public/images/blog/static-sites-cover.jpg",
    thumbnail: "/images/blog/static-sites-thumb.jpg",
    markdown: "content/static-sites-still-win.md",
    publishDate: "2026-06-02",
    updatedDate: "2026-06-04",
    readingTime: 6,
    featured: true,
    featuredOrder: 1,
    seoTitle: "Static Sites Still Win in 2026 — A Practical Case",
    metaDescription:
      "Why plain HTML, CSS, and vanilla JS remain the best default for content-driven websites in 2026.",
    canonical: "",
    ogImage: "/images/og/static-sites-og.jpg",
  },
  {
    id: "blog-002",
    slug: "designing-a-token-system",
    title: "Designing a Token System That Survives Contact With Real Work",
    subtitle: "Color, type, and spacing rules your team will actually follow",
    description:
      "A practical walkthrough of building a design token system from scratch, including naming and governance.",
    author: "author-rima",
    category: "cat-design",
    tags: ["Design Systems", "Typography", "CSS"],
    coverImage: "/images/blog/token-system-cover.jpg",
    thumbnail: "/images/blog/token-system-thumb.jpg",
    markdown: "content/designing-a-token-system.md",
    publishDate: "2026-05-20",
    updatedDate: "2026-05-20",
    readingTime: 8,
    featured: true,
    featuredOrder: 2,
    seoTitle: "Designing a Design Token System That Actually Survives",
    metaDescription:
      "How to build a color, type, and spacing token system your team will actually follow.",
    canonical: "",
    ogImage: "/images/og/token-system-og.jpg",
  },
  {
    id: "blog-003",
    slug: "seo-for-product-pages",
    title: "SEO for Product Pages Nobody Is Searching For (Yet)",
    subtitle: "Matching your copy to how people actually search",
    description:
      "Lessons from rewriting e-commerce collection pages around real Search Console query data.",
    author: "author-najmul",
    category: "cat-seo",
    tags: ["SEO", "E-commerce", "Writing"],
    coverImage: "/images/blog/seo-cover.jpg",
    thumbnail: "/images/blog/seo-thumb.jpg",
    markdown: "content/seo-for-product-pages.md",
    publishDate: "2026-05-08",
    updatedDate: "2026-05-08",
    readingTime: 7,
    featured: true,
    featuredOrder: 4,
    seoTitle: "SEO for Product Pages: Matching Copy to Real Search Behavior",
    metaDescription:
      "How to rewrite e-commerce product and collection pages around actual Search Console query data.",
    canonical: "",
    ogImage: "/images/og/seo-og.jpg",
  },
  {
    id: "blog-004",
    slug: "reading-time-is-a-lie",
    title: "Reading Time Estimates Are a Lie (And That's Fine)",
    subtitle: "What that little clock icon is actually good for",
    description:
      "A short, honest look at why reading-time estimates are inaccurate and why readers rely on them anyway.",
    author: "author-rima",
    category: "cat-product",
    tags: ["Writing", "Accessibility"],
    coverImage: "/images/blog/reading-time-cover.jpg",
    thumbnail: "/images/blog/reading-time-thumb.jpg",
    markdown: "content/reading-time-is-a-lie.md",
    publishDate: "2026-04-22",
    updatedDate: "2026-04-22",
    readingTime: 4,
    featured: false,
    featuredOrder: null,
    seoTitle: "Reading Time Estimates Are a Lie (And That's Fine)",
    metaDescription:
      "Why reading-time estimates are inaccurate, and what they're actually useful for.",
    canonical: "",
    ogImage: "/images/og/reading-time-og.jpg",
  },
  {
    id: "blog-005",
    slug: "building-search-without-a-server",
    title: "Building Instant Search Without a Server",
    subtitle: "Fuzzy client-side search with Fuse.js on a static site",
    description:
      "A walkthrough of shipping fast, typo-tolerant search on a fully static blog using Fuse.js.",
    author: "author-najmul",
    category: "cat-engineering",
    tags: ["JavaScript", "Static Sites", "Performance"],
    coverImage: "/images/blog/search-cover.jpg",
    thumbnail: "/images/blog/search-thumb.jpg",
    markdown: "content/building-search-without-a-server.md",
    publishDate: "2026-04-10",
    updatedDate: "2026-04-15",
    readingTime: 9,
    featured: true,
    featuredOrder: 3,
    seoTitle: "Building Instant Client-Side Search With Fuse.js",
    metaDescription:
      "How to ship fast, typo-tolerant search on a static site using Fuse.js — no server required.",
    canonical: "",
    ogImage: "/images/og/search-og.jpg",
  },
  {
    id: "blog-006",
    slug: "accessible-by-default",
    title: "Accessible by Default: A Checklist for Content Sites",
    subtitle: "The 20% of accessibility work that covers 80% of real users",
    description:
      "A pragmatic accessibility checklist for static, content-heavy websites — no framework required.",
    author: "author-rima",
    category: "cat-engineering",
    tags: ["Accessibility", "CSS"],
    coverImage: "/images/blog/a11y-cover.jpg",
    thumbnail: "/images/blog/a11y-thumb.jpg",
    markdown: "content/accessible-by-default.md",
    publishDate: "2026-03-28",
    updatedDate: "2026-03-28",
    readingTime: 6,
    featured: false,
    featuredOrder: null,
    seoTitle: "Accessible by Default: A Checklist for Content Sites",
    metaDescription:
      "A pragmatic accessibility checklist for static, content-heavy websites.",
    canonical: "",
    ogImage: "/images/og/a11y-og.jpg",
  },
  {
    id: "blog-007",
    slug: "core-web-vitals-for-blogs",
    title: "Core Web Vitals for a Blog Nobody's Auditing",
    subtitle: "The five-afternoon checklist that quietly fixes years of drift",
    description:
      "A practical walkthrough of LCP, INP, and CLS for content sites — what actually moves the numbers, and what doesn't.",
    author: "author-najmul",
    category: "cat-engineering",
    tags: ["Performance", "SEO", "Static Sites", "Najmul-shaon"],
    coverImage: "/images/blog/core-web-vitals-cover.jpg",
    thumbnail: "/images/blog/core-web-vitals-thumb.jpg",
    markdown: "content/core-web-vitals-for-blogs.md",
    publishDate: "2026-08-01",
    updatedDate: "2026-08-01",
    readingTime: 6,
    featured: false,
    featuredOrder: null,
    seoTitle: "Core Web Vitals for a Blog Nobody's Auditing",
    metaDescription:
      "A practical checklist for improving LCP, INP, and CLS on content-driven static sites.",
    canonical: "",
    ogImage: "/images/og/core-web-vitals-og.jpg",
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

export function getFeaturedBlogs() {
  return blogs
    .filter((b) => b.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
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
