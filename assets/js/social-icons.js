// assets/js/social-icons.js
//
// Lucide (loaded from CDN) has dropped brand/logo icons (github, twitter,
// linkedin, facebook) in recent releases, so referencing them via
// data-lucide="..." silently fails. Rather than pin to a specific old
// Lucide version and risk this breaking again later, brand platforms are
// rendered as small monogram badges here instead. Generic icons (rss,
// mail, link, send, message-circle, etc.) still go through Lucide as normal.

const BRAND_LABELS = {
  github: "GH",
  twitter: "X",
  linkedin: "in",
  facebook: "f",
};

export function socialIconMarkup(platform) {
  const label = BRAND_LABELS[platform];
  if (label) {
    return `<span class="font-mono text-[11px] font-semibold leading-none" aria-hidden="true">${label}</span>`;
  }
  // Not a brand icon — fall back to a normal Lucide icon.
  return `<i data-lucide="${platform}" class="w-4 h-4"></i>`;
}
