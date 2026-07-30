// assets/js/utils.js
import { getAuthorById } from "../../data/authors.js";
import { getCategoryBySlug, categories } from "../../data/categories.js";
import { tags as allTags } from "../../data/tags.js";

export function qs(param) {
  return new URLSearchParams(window.location.search).get(param);
}

export function setQs(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === undefined || v === "") url.searchParams.delete(k);
    else url.searchParams.set(k, v);
  });
  window.history.replaceState({}, "", url);
}

export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function categoryById(id) {
  return categories.find((c) => c.id === id);
}

export function tagById(id) {
  return allTags.find((t) => t.id === id);
}

export function authorFor(blog) {
  return getAuthorById(blog.author);
}

export function categoryFor(blog) {
  return categoryById(blog.category);
}

export function tagsFor(blog) {
  return blog.tags.map((id) => tagById(id)).filter(Boolean);
}

export function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// ---- localStorage-backed feature stores ----
const LS = {
  bookmarks: "marginalia:bookmarks",
  history: "marginalia:history",
};

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}
function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function isBookmarked(slug) {
  return readList(LS.bookmarks).includes(slug);
}
export function toggleBookmark(slug) {
  const list = readList(LS.bookmarks);
  const idx = list.indexOf(slug);
  if (idx === -1) list.push(slug);
  else list.splice(idx, 1);
  writeList(LS.bookmarks, list);
  return list.includes(slug);
}
export function getBookmarks() {
  return readList(LS.bookmarks);
}

export function pushHistory(slug) {
  let list = readList(LS.history).filter((s) => s !== slug);
  list.unshift(slug);
  list = list.slice(0, 12);
  writeList(LS.history, list);
}
export function getHistory() {
  return readList(LS.history);
}

export function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
