## The pitch nobody makes anymore

Every few months a new framework promises to make the web faster by adding more of itself between you and the browser. Meanwhile, a plain HTML file with some CSS and a sprinkle of vanilla JavaScript loads before your analytics script even finishes negotiating its handshake.

This isn't a nostalgia piece. It's a practical argument: for content-driven sites — blogs, docs, marketing pages, portfolios — the static stack is usually the *correct* engineering choice, not the compromise one.

### What you actually give up

Be honest about the trade-offs before dismissing them:

- **No server-side personalization.** Every visitor gets the same HTML until JavaScript changes it client-side.
- **Build-time content only** (unless you fetch at runtime), so truly live data needs a small API layer anyway.
- **You write more plumbing** for things frameworks give you for free — routing, data fetching helpers, component reuse.

None of these matter for a blog. All of them matter for a dashboard. Know which one you're building.

### What you get back

```js
// A blog card component, in full, with no build step
export function BlogCard(blog, author) {
  return `
    <article class="blog-card" data-aos="fade-up">
      <a href="blog.html?slug=${blog.slug}">
        <img src="${blog.thumbnail}" alt="${blog.title}" loading="lazy" />
        <h3>${blog.title}</h3>
      </a>
    </article>
  `;
}
```

No bundler config, no hydration mismatch warnings, no dependency tree to audit before a security patch. The entire mental model fits in your head.

### The real deciding question

Don't ask "is static faster." It usually is, but that's not the point. Ask: **does this page need per-request computation?** If the answer is no — and for most blogs, marketing sites, and documentation it is no — you're paying complexity tax for nothing.

Ship the boring stack. Reach for more only when the page actually asks for it.
