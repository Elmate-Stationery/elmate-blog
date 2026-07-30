## Tokens are a contract, not a color palette

A design token system fails the moment it becomes decoration — a `colors.js` file nobody consults before shipping a new shade of blue. A token system that survives contact with real work is a **contract**: a small, named vocabulary that both design and code agree to use instead of raw values.

### Start smaller than you think

Most teams over-scope their first token pass. You don't need `--color-neutral-50` through `--color-neutral-950` on day one. You need:

1. A background and a surface color, light and dark
2. One text color with two opacity steps (primary, muted)
3. One accent color, used sparingly
4. A single spacing scale (4px base is a safe default)

Everything else gets added when a real screen asks for it, not speculatively.

### Naming is the hard part

`--brand-blue` is a value with a name taped on. `--color-accent-primary` describes a *role*. When your accent color changes in a rebrand, only the second naming scheme survives without a find-and-replace across every file.

Good token names describe **what the thing is for**, not what it currently looks like.

### Governance beats tooling

The best token tooling in the world won't stop a tired engineer from typing a raw hex value directly into a stylesheet at 11pm. What stops that is:

- A lint rule that flags raw hex values in component files
- A short, boring PR checklist item: "uses existing tokens?"
- Someone whose job it is to say no

Tokens are a coordination problem before they're a technical one. Solve the coordination problem first, and the tooling will actually get used.
