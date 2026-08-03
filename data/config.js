// data/config.js
// Single source of truth for site-wide settings.
// Edit this file to rebrand the entire site.

export const siteConfig = {
  siteName: "Marginalia",
  tagline: "Field notes on building things well",
  siteDescription:
    "Marginalia is a field-notes blog on product, code, and craft — short, practical writing for people who build things.",
  url: "https://elmate-stationery.github.io/elmate-blog",
  logo: "public/images/logo/logo.png",
  logoMark: "M", // fallback text mark if no logo image is present
  favicon: "public/favicon/favicon.ico",

  defaultSEO: {
    titleTemplate: "%s — Marginalia",
    defaultTitle: "Marginalia — Field notes on building things well",
    metaDescription:
      "Practical, no-fluff writing on product development, front-end engineering, and design systems.",
    ogImage: "public/images/og/default-og.jpg",
    twitterHandle: "@marginalia",
    locale: "en_US",
  },

  social: {
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    facebook: "https://facebook.com/",
    rss: "public/rss.xml",
  },

  contact: {
    email: "hello@marginalia.blog",
    location: "Dhaka, Bangladesh",
    formspreeEndpoint: "", // e.g. "https://formspree.io/f/xxxxxx" — leave blank to disable
  },

  navigation: {
    primary: [
      { label: "Home", href: "" },
      { label: "Blogs", href: "blogs/" },
      { label: "Categories", href: "categories/" },
      { label: "Tags", href: "tags/" },
      { label: "About", href: "about/" },
      { label: "Contact", href: "contact/" },
    ],
  },

  footerLinks: {
    quickLinks: [
      { label: "About", href: "about/" },
      { label: "Contact", href: "contact/" },
      { label: "Privacy Policy", href: "privacy-policy/" },
      { label: "Terms & Conditions", href: "terms/" },
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
