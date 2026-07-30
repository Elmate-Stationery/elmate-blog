## Search without infrastructure

A static blog doesn't get a search endpoint for free — no database to query, no server to run a full-text index against. The instinct is to bolt on a third-party search service. For a blog with a few hundred posts, that's usually solving a problem you don't have yet.

### Fuse.js and the good-enough index

Fuse.js does fuzzy, typo-tolerant matching entirely in the browser against a JSON array you already have — your blog metadata. No server round-trip after the initial page load.

```js
import Fuse from "fuse.js";
import { blogs } from "./data/blogs.js";

const fuse = new Fuse(blogs, {
  keys: ["title", "description", "tags", "category"],
  threshold: 0.35,
  ignoreLocation: true,
});

function search(query) {
  return fuse.search(query).map((result) => result.item);
}
```

That's the entire backend. It runs at whatever speed the visitor's device allows, which for a few hundred posts is imperceptible.

### The details that make it feel instant

- **Debounce the input** (150-200ms) so you're not re-searching on every keystroke
- **Highlight matches** using Fuse's match data so results feel earned, not arbitrary
- **Show a real empty state** — a clear "no results, try a broader term" beats a blank list
- **Keyboard shortcut** (`/` to focus, `Esc` to close) — small, but it's the difference between a search box and a search feature

### When to stop using this approach

Once you're past a few thousand documents, or you need search across full article bodies rather than metadata, the JSON payload gets heavy enough to reconsider. For a blog of any reasonable size, though, this is the entire solution — no server required.
