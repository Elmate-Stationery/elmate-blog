// data/config.js
// Single source of truth for site-wide settings.
// Edit this file to rebrand the entire site.

export const siteConfig = {
  siteName: "Elmate Stationery",
  tagline: "Field notes on building things well",
  siteDescription:
    "Elmate Stationery is a field-notes blog on product, code, and craft — short, practical writing for people who build things.",
  url: "https://elmate-stationery.github.io/elmate-blog",
  logo: "public/images/logo/Elmate-Stationery-logo.png",
  logoMark: "M", // fallback text mark if no logo image is present
  favicon: "public/favicon/favicon.png",

  defaultSEO: {
    titleTemplate: "%s — Elmate Stationery",
    defaultTitle: "Elmate Stationery — Field notes on building things well",
    metaDescription:
      "Practical, no-fluff writing on product development, front-end engineering, and design systems.",
    ogImage: "public/images/og/default-og.jpg",
    twitterHandle: "@Elmate Stationery",
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
    email: "hello@Elmate Stationery.blog",
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
      { label: "Studio", href: "studio/" },
    ],
  },

  theme: {
    default: "system", // "light" | "dark" | "system"
    storageKey: "Elmate Stationery:theme",
  },

  pagination: {
    perPage: 6,
  },

  analytics: {
    googleAnalyticsId: "", // e.g. "G-XXXXXXX"
    plausibleDomain: "", // e.g. "Elmate Stationery.blog"
  },

  giscus: {
    enabled: false,
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
  },
};
