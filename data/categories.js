// data/categories.js
export const categories = [
  {
    id: "cat-stationery-items",
    name: "Stationery Items",
    slug: "stationery-items",
    image: "public/images/categories/stationery.jpg",
    description:
      "Essential stationery items, everyday supplies, and practical guides for school, office, and personal use.",
  },
  {
    id: "cat-pens",
    name: "Pens",
    slug: "pens",
    image: "public/images/categories/pens.jpg",
    description:
      "Ballpoint pens, gel pens, rollerball pens, and other writing tools for school, office, and everyday use.",
  },
  {
    id: "cat-pencils",
    name: "Pencils",
    slug: "pencils",
    image: "public/images/categories/pencils.jpg",
    description:
      "Graphite pencils, mechanical pencils, colored pencils, and essential writing tools for students and creatives.",
  },
  {
    id: "cat-notebooks",
    name: "Notebooks & Paper",
    slug: "notebooks-paper",
    image: "public/images/categories/notebooks.jpg",
    description:
      "Notebooks, writing pads, paper products, and everyday essentials for studying, planning, and note-taking.",
  },
  {
    id: "cat-school-supplies",
    name: "School Supplies",
    slug: "school-supplies",
    image: "public/images/categories/school-supplies.jpg",
    description:
      "Essential school stationery, student supplies, and practical guides for studying and classroom needs.",
  },
  {
    id: "cat-office-supplies",
    name: "Office Supplies",
    slug: "office-supplies",
    image: "public/images/categories/office-supplies.jpg",
    description:
      "Practical office stationery, desk essentials, and supplies for productive workplaces and everyday tasks.",
  },
  {
    id: "cat-art-craft",
    name: "Art & Craft",
    slug: "art-craft",
    image: "public/images/categories/art-craft.jpg",
    description:
      "Art materials, coloring tools, craft supplies, and creative essentials for artists, students, and hobbyists.",
  },
  {
    id: "cat-writing-tools",
    name: "Writing Tools",
    slug: "writing-tools",
    image: "public/images/categories/writing-tools.jpg",
    description:
      "Guides to everyday writing instruments, including markers, highlighters, fineliners, and specialty writing tools.",
  },
  {
    id: "cat-correction-adhesives",
    name: "Correction & Adhesives",
    slug: "correction-adhesives",
    image: "public/images/categories/correction-adhesives.jpg",
    description:
      "Correction tapes, erasers, glue, and adhesive stationery for school, office, and creative projects.",
  },
  {
    id: "cat-desk-organization",
    name: "Desk Organization",
    slug: "desk-organization",
    image: "public/images/categories/desk-organization.jpg",
    description:
      "Desk organizers, storage solutions, and stationery accessories for keeping work and study spaces organized.",
  },
  {
    id: "cat-buying-guides",
    name: "Buying Guides",
    slug: "buying-guides",
    image: "public/images/categories/buying-guides.jpg",
    description:
      "Helpful stationery buying guides, product comparisons, and practical tips for choosing the right supplies.",
  },
  {
    id: "cat-product-guides",
    name: "Product Guides",
    slug: "product-guides",
    image: "public/images/categories/product-guides.jpg",
    description:
      "Detailed guides to stationery products, their uses, features, and how to choose the right option.",
  },
  {
    id: "cat-productivity",
    name: "Productivity",
    slug: "productivity",
    image: "public/images/categories/productivity.jpg",
    description:
      "Organization, planning, and stationery-based ideas to make studying and working more productive.",
  },
  {
    id: "cat-stationery-trends",
    name: "Stationery Trends",
    slug: "stationery-trends",
    image: "public/images/categories/stationery-trends.jpg",
    description:
      "New stationery trends, popular products, creative desk setups, and ideas shaping the stationery world.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
