// assets/js/layout.js
import { mountNavbar } from "../../components/navbar.js";
import { mountFooter } from "../../components/footer.js";
import { renderSearchModal, mountSearchModal } from "../../components/search-modal.js";
import { initTheme } from "./theme.js";

export function bootLayout(activeHref = "") {
  mountNavbar(activeHref);
  mountFooter();

  const searchRoot = document.getElementById("search-modal-root");
  if (searchRoot) {
    searchRoot.innerHTML = renderSearchModal();
    mountSearchModal();
  }

  initTheme();
  initBackToTop();
  initIcons();
  initAnimations();
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

export function initIcons() {
  if (window.lucide) window.lucide.createIcons();
}

export function initAnimations() {
  if (window.AOS) window.AOS.init({ duration: 500, once: true, offset: 40 });
}
