---
'svelte-meta-tags': patch
---

fix: update `schema-dts` to `^2.1.0`. The `schema` prop of `JsonLd` now accepts the schema.org v30.1 types, and `typescript` is no longer required as a peer dependency (via `schema-dts-lib`), so projects without TypeScript no longer need to add it under strict peer-dependency enforcement.
