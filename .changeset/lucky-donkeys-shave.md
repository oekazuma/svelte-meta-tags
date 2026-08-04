---
'svelte-meta-tags': patch
---

refactor: move the `<meta name="robots">` content builder out of `MetaTags.svelte` into an internal `robots` module.

The rendered output is unchanged. The published package gains `dist/robots.js` and `dist/robots.d.ts`, which `dist/MetaTags.svelte` imports at runtime. The module is not listed in `exports`, so it stays internal and there is no new public API.
