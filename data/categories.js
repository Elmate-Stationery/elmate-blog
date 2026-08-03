// data/categories.js
export const categories = [
  {
    id: "cat-engineering",
    name: "Engineering",
    slug: "engineering",
    image: "public/images/categories/engineering.jpg",
    description:
      "Front-end architecture, performance, and the practical trade-offs of shipping real products.",
  },
  {
    id: "cat-design",
    name: "Design",
    slug: "design",
    image: "public/images/categories/design.jpg",
    description:
      "Design systems, typography, and the reasoning behind interface decisions.",
  },
  {
    id: "cat-product",
    name: "Product",
    slug: "product",
    image: "public/images/categories/product.jpg",
    description: "Notes on building and launching products people actually use.",
  },
  {
    id: "cat-seo",
    name: "SEO & Growth",
    slug: "seo-growth",
    image: "public/images/categories/seo.jpg",
    description: "Search, content strategy, and getting found by the right people.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
