// data/categories.js
export const categories = [
  {
    id: "cat-engineering",
    name: "Engineering",
    slug: "engineering",
    image: "/images/categories/engineering.jpg",
    description:
      "Front-end architecture, performance, and the practical trade-offs of shipping real products.",
  },
  {
    id: "cat-design",
    name: "Design",
    slug: "design",
    image: "/images/categories/design.jpg",
    description:
      "Design systems, typography, and the reasoning behind interface decisions.",
  },
  {
    id: "cat-product",
    name: "Product",
    slug: "product",
    image: "/images/categories/product.jpg",
    description:
      "Notes on building and launching products people actually use.",
  },
  {
    id: "cat-seo",
    name: "SEO & Growth",
    slug: "seo-growth",
    image: "/images/categories/seo.jpg",
    description:
      "Search, content strategy, and getting found by the right people.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
