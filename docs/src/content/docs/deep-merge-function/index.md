---
title: Deep Merge function
sidebar:
  badge:
    text: New
    variant: tip
---

Provides a function to deeply merge the enumerable properties of two or more objects.

Use this when you want to override the default values on child pages, as in the following example.

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
  const baseMeta = defineBaseMetaTags({
    title: 'Default',
    titleTemplate: '%s | Svelte Meta Tags',
    description: 'Svelte Meta Tags is a Svelte component for managing meta tags and SEO in your Svelte applications.',
    canonical: new URL(url.pathname, url.origin).href, // creates a cleaned up URL (without hashes or query params) from your current URL
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

  return { ...baseMeta };
};
```

## +page.ts

```ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageMeta = definePageMetaTags({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  });

  return { ...pageMeta };
};
```
