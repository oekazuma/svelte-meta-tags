---
'svelte-meta-tags': patch
---

fix: prevent the internal `httpEquiv` prop from leaking as an attribute on `additionalMetaTags` `<meta>` tags; only the mapped `http-equiv` attribute is rendered now
