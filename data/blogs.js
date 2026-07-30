// data/blogs.js
// Metadata only. Article body lives in content/<markdown>.md
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
    tags: ["tag-static-sites", "tag-performance", "tag-javascript"],
    coverImage: "/public/images/blog/static-sites-cover.jpg",
    thumbnail: "/public/images/blog/static-sites-thumb.jpg",
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
    ogImage: "/public/images/og/static-sites-og.jpg",
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
    tags: ["tag-design-systems", "tag-typography", "tag-css"],
    coverImage: "/public/images/blog/token-system-cover.jpg",
    thumbnail: "/public/images/blog/token-system-thumb.jpg",
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
    ogImage: "/public/images/og/token-system-og.jpg",
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
    tags: ["tag-seo", "tag-ecommerce", "tag-writing"],
    coverImage: "/public/images/blog/seo-cover.jpg",
    thumbnail: "/public/images/blog/seo-thumb.jpg",
    markdown: "content/seo-for-product-pages.md",
    publishDate: "2026-05-08",
    updatedDate: "2026-05-08",
    readingTime: 7,
    featured: false,
    featuredOrder: null,
    seoTitle: "SEO for Product Pages: Matching Copy to Real Search Behavior",
    metaDescription:
      "How to rewrite e-commerce product and collection pages around actual Search Console query data.",
    canonical: "",
    ogImage: "/public/images/og/seo-og.jpg",
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
    tags: ["tag-writing", "tag-accessibility"],
    coverImage: "/public/images/blog/reading-time-cover.jpg",
    thumbnail: "/public/images/blog/reading-time-thumb.jpg",
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
    ogImage: "/public/images/og/reading-time-og.jpg",
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
    tags: ["tag-javascript", "tag-static-sites", "tag-performance"],
    coverImage: "/public/images/blog/search-cover.jpg",
    thumbnail: "/public/images/blog/search-thumb.jpg",
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
    ogImage: "/public/images/og/search-og.jpg",
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
    tags: ["tag-accessibility", "tag-css"],
    coverImage: "/public/images/blog/a11y-cover.jpg",
    thumbnail: "/public/images/blog/a11y-thumb.jpg",
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
    ogImage: "/public/images/og/a11y-og.jpg",
  },
];

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogsByCategory(categoryId) {
  return blogs.filter((b) => b.category === categoryId);
}

export function getBlogsByTag(tagId) {
  return blogs.filter((b) => b.tags.includes(tagId));
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

export function getRelatedBlogs(blog, limit = 3) {
  return blogs
    .filter((b) => b.id !== blog.id)
    .map((b) => {
      let score = 0;
      if (b.category === blog.category) score += 2;
      score += b.tags.filter((t) => blog.tags.includes(t)).length;
      return { b, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, z) => z.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.b);
}
