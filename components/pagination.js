// components/pagination.js
export function renderPagination(current, totalPages, onPage) {
  if (totalPages <= 1) return "";

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - current) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const pageBtns = pages
    .map((p) =>
      p === "…"
        ? `<span class="px-2 text-[var(--text-muted)]">&hellip;</span>`
        : `<button data-page="${p}" class="w-9 h-9 rounded text-sm font-mono ${
            p === current
              ? "bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--pine)]"
              : "border rule hover:border-[var(--pine)]"
          }">${p}</button>`
    )
    .join("");

  const wrapper = document.createElement("div");
  wrapper.className = "flex items-center justify-center gap-1.5 mt-10";
  wrapper.innerHTML = `
    <button data-page="${Math.max(1, current - 1)}" ${current === 1 ? "disabled" : ""} class="w-9 h-9 rounded border rule flex items-center justify-center disabled:opacity-30 hover:border-[var(--pine)]" aria-label="Previous page">
      <i data-lucide="chevron-left" class="w-4 h-4"></i>
    </button>
    ${pageBtns}
    <button data-page="${Math.min(totalPages, current + 1)}" ${current === totalPages ? "disabled" : ""} class="w-9 h-9 rounded border rule flex items-center justify-center disabled:opacity-30 hover:border-[var(--pine)]" aria-label="Next page">
      <i data-lucide="chevron-right" class="w-4 h-4"></i>
    </button>`;

  wrapper.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => onPage(Number(btn.dataset.page)));
  });

  return wrapper;
}
