// assets/js/theme.js
import { siteConfig } from "../../data/config.js";

const STORAGE_KEY = siteConfig.theme.storageKey;

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY) || siteConfig.theme.default;
}

export function applyTheme(theme) {
  const resolved = theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.setAttribute("data-theme-mode", theme);
  updateToggleIcon(resolved);
}

export function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function cycleTheme() {
  const current = getStoredTheme();
  const order = ["light", "dark", "system"];
  const next = order[(order.indexOf(current) + 1) % order.length];
  setTheme(next);
}

function updateToggleIcon(resolved) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const sun = btn.querySelector('[data-icon="sun"]');
  const moon = btn.querySelector('[data-icon="moon"]');
  if (sun && moon) {
    sun.classList.toggle("hidden", resolved === "dark");
    moon.classList.toggle("hidden", resolved !== "dark");
  }
}

export function initTheme() {
  applyTheme(getStoredTheme());
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getStoredTheme() === "system") applyTheme("system");
  });
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", cycleTheme);
}

// Apply immediately (before paint) if this module loads early.
applyTheme(getStoredTheme());
