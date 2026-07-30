// components/newsletter.js
import { siteConfig } from "../data/config.js";

export function renderNewsletter() {
  return `
  <div class="rounded-lg border rule p-8 bg-[var(--pine-light)] dark:bg-[var(--surface-dark)] flex flex-col md:flex-row md:items-center md:justify-between gap-6" data-aos="fade-up">
    <div>
      <h3 class="font-display text-xl font-semibold mb-1">Get new posts in your inbox</h3>
      <p class="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted-dark)]">One email when something new is published. No spam, unsubscribe anytime.</p>
    </div>
    <form id="newsletter-form" class="flex w-full md:w-auto gap-2">
      <label for="newsletter-email" class="sr-only">Email address</label>
      <input id="newsletter-email" type="email" required placeholder="you@example.com"
        class="flex-1 md:w-64 px-4 py-2.5 rounded border rule bg-[var(--paper)] dark:bg-[var(--paper-dark)] text-sm focus:outline-none" />
      <button type="submit" class="btn-primary whitespace-nowrap text-sm">Subscribe</button>
    </form>
  </div>
  <p id="newsletter-status" class="text-sm mt-2" role="status"></p>`;
}

export function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  const status = document.getElementById("newsletter-status");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;
    const endpoint = siteConfig.contact.formspreeEndpoint;

    if (!endpoint) {
      status.textContent = `Thanks — ${email} would be subscribed once a Formspree/Mailchimp endpoint is configured in data/config.js.`;
      form.reset();
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      status.textContent = res.ok
        ? "Thanks for subscribing — check your inbox to confirm."
        : "Something went wrong. Please try again.";
      if (res.ok) form.reset();
    } catch {
      status.textContent = "Network error. Please try again.";
    }
  });
}
