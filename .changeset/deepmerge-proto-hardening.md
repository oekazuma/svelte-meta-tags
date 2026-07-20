---
'svelte-meta-tags': patch
---

fix: harden `deepMerge` against `__proto__` / `constructor` / `prototype` keys in the source object
