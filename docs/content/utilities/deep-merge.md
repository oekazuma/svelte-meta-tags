---
title: Deep Merge
sidebar:
  order: 10
---

`deepMerge(target, source)` deeply merges two `MetaTagsProps`-shaped objects. Use it to override a layout's default meta tags with page-specific values, as in the following example.

## Merge rules

`deepMerge` applies these rules per property, in order:

1. If `target` or `source` is `null`/`undefined`, the other one is returned as-is (or `{}` if both are missing).
2. If the **target** value is a `Date` instance or a function, the target value wins — the source value is ignored, even if it's also a `Date`/function.
3. Otherwise, if the **source** value is a `Date` instance or a function, the source value wins.
4. If both values are non-null objects that aren't arrays — this includes class instances other than `Date`, not just plain object literals — they're merged recursively.
5. If both values are arrays, the **source array replaces the target array entirely** — arrays are never concatenated.
6. Otherwise, the source value is used unless it's `undefined`, in which case the target value is kept.

```ts
import { deepMerge } from 'svelte-meta-tags';

const target = {
  title: 'Default Title',
  description: 'Default Description',
  openGraph: { images: [{ url: 'https://example.com/default.jpg' }] }
};

const source = {
  title: undefined,
  description: 'Page Description',
  openGraph: { images: [{ url: 'https://example.com/page.jpg' }] }
};

deepMerge(target, source);
// => {
//   title: 'Default Title',                                          // undefined source keeps target
//   description: 'Page Description',                                 // source wins
//   openGraph: { images: [{ url: 'https://example.com/page.jpg' }] } // array replaced, not concatenated
// }
```

## +layout.svelte

```svelte
<script>
  import { page } from '$app/state';
  import { MetaTags, deepMerge } from 'svelte-meta-tags';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
```

## +layout.ts

```ts
import { defineBaseMetaTags } from 'svelte-meta-tags';

export const load = ({ url }) => {
  const baseTags = defineBaseMetaTags({
    title: 'Default',
    titleTemplate: '%s | Svelte Meta Tags',
    description: 'Svelte Meta Tags is a Svelte component for managing meta tags and SEO in your Svelte applications.',
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: 'website',
      url: new URL(url.pathname, url.origin).href,
      locale: 'en_IE',
      title: 'Open Graph Title',
      description: 'Open Graph Description',
      siteName: 'SiteName',
      images: [
        {
          url: 'https://www.example.ie/og-image.jpg',
          alt: 'Og Image Alt',
          width: 800,
          height: 600,
          secureUrl: 'https://www.example.ie/og-image.jpg',
          type: 'image/jpeg'
        }
      ]
    }
  });

  return { ...baseTags };
};
```

## +page.ts

```ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageTags = definePageMetaTags({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  });

  return { ...pageTags };
};
```

See [Define Meta Tags](/utilities/define-meta-tags) for what `defineBaseMetaTags`/`definePageMetaTags` actually do.
