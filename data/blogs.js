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
    category: "cat-stationery-items",
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
  {
    id: "blog-where-to-find-cheap-office-supplies-10-smart-ways-to-save-money",
    slug: "where-to-find-cheap-office-supplies-10-smart-ways-to-save-money",
    title: "Where to Find Cheap Office Supplies: 10 Smart Ways to Save Money",
    subtitle: "",
    description: "",
    author: "author-najmul",
    category: "cat-office-supplies",
    tags: ["where to find cheap office supplies"],
    coverImage:
      "public/images/blog/where-to-find-cheap-office-supplies-10-smart-ways-to-save-money-cover.webp",
    thumbnail:
      "public/images/blog/where-to-find-cheap-office-supplies-10-smart-ways-to-save-money-cover.webp",
    contentFile:
      "content/where-to-find-cheap-office-supplies-10-smart-ways-to-save-money.html",
    publishDate: "2026-08-10",
    updatedDate: "2026-08-10",
    readingTime: 7,
    featured: true,
    featuredOrder: 1,
    seoTitle:
      "Where to Find Cheap Office Supplies: 10 Smart Ways to Save Money",
    metaDescription: "",
    canonical: "",
    ogImage:
      "public/images/og/where-to-find-cheap-office-supplies-10-smart-ways-to-save-money-og.jpg",
  },
  {
    id: "blog-stationery-items-complete-guide-to-school-office-art-supplies-in-bangladesh",
    slug: "stationery-items-complete-guide-to-school-office-art-supplies-in-bangladesh",
    title:
      "Stationery Items: Complete Guide to School, Office & Art Supplies in Bangladesh",
    subtitle:
      "Explore essential stationery items for school, office, study, art, crafts, and everyday use in Bangladesh.",
    description:
      "Discover a wide range of stationery items including pencils, pens, geometry boxes, art supplies, staplers, markers, office essentials, stationery sets, and creative products available online in Bangladesh.",
    author: "author-najmul",
    category: "cat-stationery-items",
    tags: [
      "school stationery",
      "office stationery",
      "art supplies",
      "stationery items in bangladesh",
      "stationery products",
      "buy stationery online",
      "stationery items price in bangladesh",
    ],
    coverImage:
      "public/images/blog/stationery-items-complete-guide-to-school-office-art-supplies-in-bangladesh-cover.jpg",
    thumbnail:
      "public/images/blog/stationery-items-complete-guide-to-school-office-art-supplies-in-bangladesh-cover.jpg",
    contentFile:
      "content/stationery-items-complete-guide-to-school-office-art-supplies-in-bangladesh.html",
    publishDate: "2026-08-06",
    updatedDate: "2026-08-06",
    readingTime: 6,
    featured: true,
    featuredOrder: 1,
    seoTitle:
      "Stationery Items: Complete Guide to School, Office & Art Supplies in Bangladesh",
    metaDescription:
      "Discover a wide range of stationery items including pencils, pens, geometry boxes, art supplies, staplers, markers, office essentials, stationery sets, and creative products available online in Bangladesh.",
    canonical: "",
    ogImage:
      "public/images/og/stationery-items-complete-guide-to-school-office-art-supplies-in-bangladesh-og.jpg",
  },
  {
    id: "blog-stationery-items-for-school-office-and-creative-work-what-you-actually-need",
    slug: "stationery-items-for-school-office-and-creative-work-what-you-actually-need",
    title:
      "Stationery Items for School, Office and Creative Work: What You Actually Need",
    subtitle:
      "Explore essential stationery items for school, office, study, art, crafts, and everyday use in Bangladesh.",
    description:
      "Explore stationery items for writing, schoolwork, office tasks, art, crafts, organization, and learning, including pencils, pens, geometry boxes, colours, staplers, markers, stationery sets, and more.",
    author: "author-najmul",
    category: "cat-stationery-items",
    tags: [
      "stationery items",
      "stationery",
      "school stationery",
      "office stationery",
      "art supplies",
      "stationery products",
      "stationery items in Bangladesh",
      "school supplies",
      "office supplies",
      "writing supplies",
      "drawing supplies",
      "stationery set",
      "craft supplies",
      "buy stationery online",
      "stationery shop Bangladesh",
    ],
    coverImage:
      "public/images/blog/stationery-items-for-school-office-and-creative-work-what-you-actually-need-cover.jpg",
    thumbnail:
      "public/images/blog/stationery-items-for-school-office-and-creative-work-what-you-actually-need-cover.jpg",
    contentFile:
      "content/stationery-items-for-school-office-and-creative-work-what-you-actually-need.html",
    publishDate: "2026-08-06",
    updatedDate: "2026-08-06",
    readingTime: 6,
    featured: true,
    featuredOrder: 1,
    seoTitle:
      "Stationery Items for School, Office and Creative Work: What You Actually Need",
    metaDescription:
      "Explore stationery items for writing, schoolwork, office tasks, art, crafts, organization, and learning, including pencils, pens, geometry boxes, colours, staplers, markers, stationery sets, and more.",
    canonical: "",
    ogImage:
      "public/images/og/stationery-items-for-school-office-and-creative-work-what-you-actually-need-og.jpg",
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
