## The 20% that covers most of the work

Full accessibility conformance is a genuine, ongoing practice. But for a static, content-heavy site, a short checklist covers the majority of real-world impact — and it's a checklist you can run through in an afternoon.

### The list

1. **Semantic HTML first.** A button that's styled to look like a link still behaves like a button for keyboard and screen-reader users. Don't reach for a clickable div when a native element already does the job.
2. **Every image needs real alt text**, not a filename. Decorative images get an empty alt attribute — that's a deliberate choice, not an oversight.
3. **Visible focus states.** If you remove the default outline, replace it with something at least as visible. Keyboard users need to see where they are.
4. **Color contrast, checked, not eyeballed.** WCAG AA is 4.5:1 for body text. Run it through a checker; "looks fine" isn't a measurement.
5. **Skip-to-content link** as the first focusable element on the page, for anyone navigating by keyboard past a repeated header.
6. **Heading order that matches visual hierarchy.** One H1 per page, no skipping levels because it "looked right" at that font size.

### What this list deliberately leaves out

This isn't a complete audit — it doesn't cover complex widgets, live regions, or screen-reader testing across multiple tools. Those matter for interactive applications. For a blog, the six items above are where the actual readers are, and they cost very little to get right the first time.
