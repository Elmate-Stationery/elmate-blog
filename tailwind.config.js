// tailwind.config.js
//
// Replaces the old inline `tailwind.config = {...}` that used to run in every
// page via the cdn.tailwindcss.com runtime compiler. Tailwind now compiles to
// a single static, minified stylesheet at build time (see `npm run build:css`),
// so the CDN is no longer loaded in the browser.
//
// `content` must list every file that contains Tailwind class names so the
// compiler can see them and keep only the classes actually used. This includes
// the HTML pages AND the component/data JS files, which build markup (with
// class="...") inside template literals.

import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./*.html",
    "./**/*.html",
    "./assets/js/**/*.js",
    "./components/**/*.js",
    "./data/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Source Serif 4", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  // Typography styles the article body: the `prose` classes on the article
  // container turn raw HTML (headings, paragraphs, lists, tables, links,
  // blockquotes, code) into a properly styled article, in light and dark.
  plugins: [typography],
};
