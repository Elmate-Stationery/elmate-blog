// data/authors.js
export const authors = [
  {
    id: "author-najmul",
    name: "Najmul Hasan",
    avatar: "/images/authors/najmul.jpg",
    designation: "Founder & Product Builder",
    bio: "Builds e-commerce brands and the tools behind them. Writes about product, front-end craft, and shipping in public.",
    website: "https://example.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
  },
  {
    id: "author-rima",
    name: "Rima Chowdhury",
    avatar: "/images/authors/rima.jpg",
    designation: "Design Systems Lead",
    bio: "Obsessed with type scales, tokens, and the small details that make interfaces feel considered.",
    website: "",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "",
  },
];

export function getAuthorById(id) {
  return authors.find((a) => a.id === id);
}
