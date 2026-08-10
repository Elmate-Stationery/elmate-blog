// assets/js/html-content.js
//
// Turns raw article HTML (including messy WordPress/TinyMCE exports) into clean,
// render-ready HTML. Two problems it solves:
//
//   1. Paragraph collapse. WordPress emits body text as bare <span> / text runs
//      separated by blank lines, relying on its server-side `wpautop` to insert
//      <p> tags at render time. Injected via innerHTML, those blank lines
//      collapse to a single space and every paragraph merges into one block.
//      We rebuild real <p> elements from the top-level inline runs, using the
//      blank lines preserved in the whitespace text nodes as the boundaries.
//
//   2. Junk markup. We unwrap layout-only <div>/<section>/<span> wrappers and
//      strip inline style="…" attributes (e.g. WordPress's font-weight:400
//      spans), leaving semantic tags — headings, lists, tables, links, bold,
//      figures, blockquotes, details — untouched.
//
// The function is idempotent: running it on already-clean HTML returns the same
// HTML, so it is safe to apply both when saving content and when rendering it.

// Block-level tags are emitted as-is and act as paragraph boundaries. Anything
// not in this set is treated as inline and gets grouped into a <p>.
const BLOCK_TAGS = new Set([
  "H1", "H2", "H3", "H4", "H5", "H6",
  "UL", "OL", "LI",
  "TABLE", "THEAD", "TBODY", "TFOOT", "TR", "TD", "TH",
  "BLOCKQUOTE", "PRE", "FIGURE", "FIGCAPTION",
  "DETAILS", "SUMMARY", "HR", "IMG", "P",
]);

// Tags whose only purpose in these exports is layout/styling — unwrap them and
// keep their children.
const UNWRAP_TAGS = "div, section, span, font";

export function normalizeArticleHTML(raw) {
  const root = document.createElement("div");
  root.innerHTML = raw || "";

  // 1. Unwrap layout-only wrappers, innermost-first via a bounded loop so nested
  //    wrappers all get flattened.
  let guard = 0;
  let wrapper;
  while ((wrapper = root.querySelector(UNWRAP_TAGS)) && guard++ < 5000) {
    wrapper.replaceWith(...wrapper.childNodes);
  }

  // 2. Strip inline style attributes (WordPress noise).
  root.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));

  // 3. Rebuild paragraphs from top-level inline runs.
  const out = [];
  let buffer = [];

  const flush = () => {
    if (!buffer.length) return;
    const p = document.createElement("p");
    buffer.forEach((n) => p.appendChild(n));
    buffer = [];
    // Only keep paragraphs that carry real content.
    if (p.textContent.trim() || p.querySelector("img, br")) out.push(p);
  };

  [...root.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim() === "") {
        // Whitespace-only: a blank line (2+ newlines) ends the paragraph;
        // a single newline/space is just inline spacing.
        if (/\n\s*\n/.test(node.textContent)) flush();
        return;
      }
      buffer.push(node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (BLOCK_TAGS.has(node.tagName)) {
        flush();
        // Drop empty paragraphs (e.g. leftovers from execCommand editing).
        if (
          node.tagName === "P" &&
          !node.textContent.trim() &&
          !node.querySelector("img, br")
        ) {
          return;
        }
        out.push(node);
      } else {
        buffer.push(node); // inline element: a, strong, em, code, br, …
      }
    }
    // Comments and other node types are dropped.
  });
  flush();

  root.replaceChildren(...out);
  return formatArticleHTML(out);
}

// ---- Pretty-printing ----
//
// The DOM serializes to one long line, which makes the generated content file
// unreadable and impossible to diff. These helpers put each block element on
// its own line, and indent the children of list/table-style containers.
// Whitespace between block-level tags is insignificant in HTML, so this
// changes nothing about how the article renders — with one exception: <pre>
// IS whitespace-sensitive, so its contents are emitted verbatim.

const INDENT = "  ";

// Containers whose children are worth breaking onto their own lines.
const CONTAINER_TAGS = new Set([
  "UL", "OL", "TABLE", "THEAD", "TBODY", "TFOOT", "TR",
  "BLOCKQUOTE", "FIGURE", "DETAILS",
]);

// Rebuild the opening tag from attributes rather than slicing outerHTML,
// which would break on an attribute value containing ">".
function openTag(el) {
  const attrs = [...el.attributes]
    .map((a) => ` ${a.name}="${String(a.value).replace(/"/g, "&quot;")}"`)
    .join("");
  return `<${el.tagName.toLowerCase()}${attrs}>`;
}

function serializeNode(node, depth) {
  const pad = INDENT.repeat(depth);
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text ? pad + text : "";
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  // <pre> is whitespace-sensitive — never reformat inside it.
  if (node.tagName === "PRE" || !CONTAINER_TAGS.has(node.tagName)) {
    return pad + node.outerHTML;
  }

  const inner = [...node.childNodes]
    .map((child) => serializeNode(child, depth + 1))
    .filter(Boolean)
    .join("\n");

  return inner
    ? `${pad}${openTag(node)}\n${inner}\n${pad}</${node.tagName.toLowerCase()}>`
    : pad + node.outerHTML;
}

export function formatArticleHTML(nodes) {
  return nodes
    .map((n) => serializeNode(n, 0))
    .filter(Boolean)
    .join("\n")
    .trim();
}
