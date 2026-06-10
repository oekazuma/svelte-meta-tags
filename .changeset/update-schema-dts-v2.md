---
'svelte-meta-tags': major
---

feat: update `schema-dts` to v2

`schema-dts` (the package providing the types for the `JsonLd` component's `schema` prop) has been updated from v1 to v2. The runtime behavior of `JsonLd` is unchanged.

This is a breaking change at the type level:

- If your app depends on `schema-dts` directly, update it to `^2.0.0`. Mixing `schema-dts` v1 types in your app with this version can cause TypeScript "Excessive stack depth" errors when assigning to the `schema` prop.
- `schema-dts` v2 itself includes breaking type changes (non-recursive `Role` typings, `Quantity` as a core DataType, renamed non-schema.org type exports). See the [schema-dts v2.0.0 release notes](https://github.com/google/schema-dts/releases/tag/v2.0.0).
- `schema-dts` v2 depends on `schema-dts-lib`, which declares `typescript >=4.9.5` as a peer dependency. With strict peer-dependency enforcement (e.g. pnpm's `strict-peer-dependencies=true`), projects without TypeScript installed may need to add it explicitly.

New `schema-dts` v2 features such as `WithActionConstraints` (typed `query-input` / `-input` / `-output` constraints) and `MergeLeafTypes` (multi-typed schema objects) work with the `schema` prop out of the box.
