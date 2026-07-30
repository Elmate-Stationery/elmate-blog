// data/config.js
// Single source of truth for site-wide settings.
// Edit this file to rebrand the entire site.

export const siteConfig = {
  siteName: "Marginalia",
  tagline: "Field notes on building things well",
  siteDescription:
    "Marginalia is a field-notes blog on product, code, and craft — short, practical writing for people who build things.",
  url: "https://example.github.io/marginalia",
  logo: "/public/images/logo/logo.png",
  logoMark: "M", // fallback text mark if no logo image is present
  favicon: "/public/favicon/favicon.ico",

  defaultSEO: {
    titleTemplate: "%s — Marginalia",
    defaultTitle: "Marginalia — Field notes on building things well",
    metaDescription:
      "Practical, no-fluff writing on product development, front-end engineering, and design systems.",
    ogImage: "/public/images/og/default-og.jpg",
    twitterHandle: "@marginalia",
    locale: "en_US",
  },

  social: {
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    facebook: "https://facebook.com/",
    rss: "/public/rss.xml",
  },

  contact: {
    email: "hello@marginalia.blog",
    location: "Dhaka, Bangladesh",
    formspreeEndpoint: "", // e.g. "https://formspree.io/f/xxxxxx" — leave blank to disable
  },

  navigation: {
    primary: [
      { label: "Home", href: "index.html" },
      { label: "Blogs", href: "blogs.html" },
      { label: "Categories", href: "categories.html" },
      { label: "Tags", href: "tags.html" },
      { label: "About", href: "about.html" },
      { label: "Contact", href: "contact.html" },
    ],
  },

  footerLinks: {
    quickLinks: [
      { label: "About", href: "about.html" },
      { label: "Contact", href: "contact.html" },
      { label: "Privacy Policy", href: "privacy-policy.html" },
      { label: "Terms & Conditions", href: "terms.html" },
    ],
  },

  theme: {
    default: "system", // "light" | "dark" | "system"
    storageKey: "marginalia:theme",
  },

  pagination: {
    perPage: 6,
  },

  analytics: {
    googleAnalyticsId: "", // e.g. "G-XXXXXXX"
    plausibleDomain: "", // e.g. "marginalia.blog"
  },

  giscus: {
    enabled: false,
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
  },
};
