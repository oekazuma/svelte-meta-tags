---
'svelte-meta-tags': patch
---

fix: type compatibility issue where schema-dts WithContext<T> types (e.g., WithContext<VideoObject>) were not assignable to JsonLdProps.schema
