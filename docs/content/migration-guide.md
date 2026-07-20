---
title: Migration Guide
sidebar:
  order: 30
---

## v5

`schema-dts` (the package providing the types for `JsonLd`'s `schema` prop) was updated from v1 to v2. `JsonLd`'s runtime behavior is unchanged — this is a type-level breaking change only:

- If your app depends on `schema-dts` directly, update it to `^2.0.0`. Mixing v1 and v2 types can cause TypeScript "Excessive stack depth" errors when assigning to the `schema` prop.
- `schema-dts` v2 has its own breaking type changes (non-recursive `Role`, `Quantity` as a core DataType, renamed non-schema.org type exports) — see the [schema-dts v2.0.0 release notes](https://github.com/google/schema-dts/releases/tag/v2.0.0).
- `schema-dts` v2 depends on `schema-dts-lib`, which declares `typescript >=4.9.5` as a peer dependency. Under strict peer-dependency enforcement (e.g. pnpm's `strict-peer-dependencies=true`), you may need to add `typescript` explicitly.

## v4

### `twitter.handle` renamed to `twitter.creator`

This change aligns with the actual property name.

**Before (v3)**

```svelte
<MetaTags
  twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Twitter',
    description: 'Twitter',
    image: 'https://www.example.ie/twitter-image.jpg',
    imageAlt: 'Twitter image alt'
  }}
/>
```

**After (v4)**

```svelte
<MetaTags
  twitter={{
    creator: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Twitter',
    description: 'Twitter',
    image: 'https://www.example.ie/twitter-image.jpg',
    imageAlt: 'Twitter image alt'
  }}
/>
```

### Added `deepMerge`

`deepMerge` is a function that deeply merges the enumerable properties of two or more objects.

Using the `deepMerge` function provided by this library is not mandatory, so you can continue to use whatever you like, but it is recommended because it reduces dependencies.

See [Example](https://github.com/oekazuma/svelte-meta-tags/tree/main/example/src/routes) for details on how to use it.

**Before (v3)**

`+layout.svelte`

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';
  import extend from 'just-extend'; // Use functions that allow deep merging of objects such as lodash.merge, deepmerge, and just-extend

  export let data;

  $: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<MetaTags {...metaTags} />

<slot />
```

**After (v4)**

`+layout.svelte`

```svelte
<script>
  import { MetaTags, deepMerge } from 'svelte-meta-tags';
  import { page } from '$app/state';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
```
