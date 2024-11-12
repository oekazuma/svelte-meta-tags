---
title: Migration Guide
---

`twitter.handle` has been renamed `twitter.creator`
This change aligns with the actual property name.

## v3

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

## v4

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

Add `deepMerge`, a function that deeply merges the enumerable properties of two or more objects.

The use of the deepMerge function provided by this library is not mandatory, so you can continue to use whatever you like, but it is recommended because it reduces dependencies.

See [Example](https://github.com/oekazuma/svelte-meta-tags/tree/main/example/src/routes) for details on how to use it.

## v3

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

## v4

`+layout.svelte`

```svelte
<script>
  import { MetaTags, deepMerge } from 'svelte-meta-tags';
  import { page } from '$app/stores';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
```
