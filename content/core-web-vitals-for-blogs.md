## The audit nobody runs on a blog

Core Web Vitals get treated like an e-commerce problem — something you fix on a checkout flow, not on a blog. That's backwards. A blog is mostly static text and images, which means it has _no excuse_ to fail these metrics, and yet most of them do, quietly, for years, because nobody thinks to check.

If you haven't looked at your site's [Core Web Vitals](https://web.dev/vitals/) recently, here's what they actually measure and why a content site should care.

### The three numbers that matter

**Largest Contentful Paint (LCP)** — how long until the biggest visible element (usually your hero image or headline) finishes rendering. Google's threshold for "good" is under 2.5 seconds. On a [static site](blog.html?slug=static-sites-still-win), this should be trivial to hit — there's no server-side rendering delay, no database query blocking the response. If your LCP is slow, the usual suspects are an unoptimized cover image or a render-blocking font request.

**Interaction to Next Paint (INP)** — replaced the older "First Input Delay" metric in 2024, and measures how responsive the page feels when someone actually clicks or taps something. For a blog this rarely matters unless you've bolted on a lot of client-side JavaScript — comment widgets, embedded videos, ad scripts, cookie banners with heavy animation. Every third-party `<script>` tag is a small tax on this number.

**Cumulative Layout Shift (CLS)** — how much content jumps around as the page loads. This is the one that quietly wrecks reading experiences: an ad slot that reserves no space, an image without a defined `width`/`height`, a "subscribe" banner that slides in after three seconds and pushes the paragraph you were reading down the screen. [MDN's performance documentation](https://developer.mozilla.org/en-US/docs/Web/Performance) has a good breakdown of what causes shift and how to reserve space in advance.

### Why this connects to SEO, not just user experience

Core Web Vitals are a **ranking signal**, not just a UX nice-to-have — Google has said as much directly. But even setting that aside, there's a simpler argument: [readers who came from a search query](blog.html?slug=seo-for-product-pages) with high intent are the ones most likely to bounce on a slow first paint. You did the hard work of matching your content to their query. Don't lose them to a three-second blank screen.

You can check where you actually stand — not a lab estimate, but real visitor data — in [Google Search Console's Core Web Vitals report](https://search.google.com/search-console/about), which pulls from the Chrome User Experience Report rather than a single synthetic test run.

### The checklist that actually moves the numbers

Most fixes are boring, which is exactly why they get skipped:

1. **Set explicit `width` and `height` on every image.** This alone eliminates most CLS issues, because the browser reserves the correct space before the image downloads.
2. **Preload your display font**, don't just link it. A `<link rel="preload">` on your primary heading font prevents the "flash of invisible text" that delays LCP.
3. **Compress and correctly size cover images.** A 2400px-wide JPEG served into a 1200px-wide container is pure waste — resize at the source, not just in CSS.
4. **Audit every third-party script.** Analytics, comment widgets, and embeds each cost something. If a script isn't earning its keep, remove it and watch your INP improve.
5. **Reserve space for anything that loads late** — newsletter banners, cookie notices, related-post widgets — with a fixed-height container, even if the content inside is still loading.

None of this requires a framework migration or a CDN contract. It's five afternoons of unglamorous cleanup, and it's the kind of work that never gets prioritized because nothing is visibly "broken" — the page just loads a little slow, forever, for everyone.

### A worked example

Say your blog's cover images are currently unsized `<img>` tags pulling in whatever the CMS exported — often 3000px wide, several hundred KB each. Fixing just this one item usually improves LCP more than any other single change, because that image is almost always the "largest contentful" element the metric is naming. Pair it with explicit dimensions from item 1 above, and you've likely fixed both LCP and CLS with one pass over your image pipeline.

If your site also cares about [accessibility](blog.html?slug=accessible-by-default), this pairs naturally — alt text, explicit dimensions, and semantic markup are usually edited in the same pass, by the same person, in the same sitting. Performance and accessibility audits overlap more than people expect.

### Where to check your own numbers

Three free tools, in order of how deep they go:

- **[PageSpeed Insights](https://pagespeed.web.dev/)** — quickest single-URL check, gives both lab and field data when available.
- **[Chrome DevTools' Lighthouse panel](https://developer.chrome.com/docs/lighthouse/overview/)** — same engine, run locally, useful while you're actively fixing something.
- **[HTTP Archive's State of the Web](https://httparchive.org/reports/state-of-the-web)** — not for your own site, but useful context for what "average" actually looks like across millions of real pages, so you know whether your numbers are actually bad or just feel bad.

### The takeaway

Core Web Vitals aren't a framework feature or a hosting-tier upsell — they're mostly a function of how disciplined you are about image sizing, font loading, and third-party scripts. A well-built [static site](tag.html?slug=static-sites) has every structural advantage here. The gap between "should be fast" and "is fast" is usually just a checklist nobody ran. Run it.

### One more thing: lazy loading isn't automatically a win

A quick caveat, because this trips people up: adding `loading="lazy"` to every image on a page sounds like a universal performance win, but applied carelessly it can _hurt_ your LCP score. If your hero image — the one that determines LCP — is marked lazy, the browser deprioritizes it and your "largest contentful paint" arrives later, not sooner. The rule of thumb: lazy-load everything below the fold, and load anything above the fold (especially your cover image) eagerly, with `fetchpriority="high"` if your target browsers support it. This is a five-minute fix once you know to look for it, and it's exactly the kind of detail a generic "add lazy loading everywhere" checklist gets wrong.

### Set a baseline, then check quarterly

The last piece of practical advice here is less technical and more procedural: pick one day a quarter, run PageSpeed Insights against your five most-visited pages, and write the LCP/INP/CLS numbers down somewhere — a spreadsheet, a note, anything. Performance regressions are rarely dramatic; they're a slow accumulation of one more analytics snippet here, one more unsized embed there. Without a baseline, you have no way to tell a genuine regression from normal fluctuation, and "it feels slower lately" isn't a metric you can act on. A five-minute quarterly check is cheap insurance against six months of unnoticed drift.
