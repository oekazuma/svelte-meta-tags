---
title: Usage
---

## Example with just title and description

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Example Title" description="Example Description." />
```

## Typical page example

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Using More of Config"
  titleTemplate="%s | Svelte Meta Tags"
  description="This example uses more of the available config options."
  canonical="https://www.canonical.ie/"
  openGraph={{
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt'
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second'
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' }
    ],
    siteName: 'SiteName'
  }}
  twitter={{
    creator: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Using More of Config',
    description: 'This example uses more of the available config options.',
    image: 'https://www.example.ie/twitter-image.jpg',
    imageAlt: 'Twitter image alt'
  }}
  facebook={{
    appId: '1234567890'
  }}
/>
```

## Overwriting default values with a child page:

[Example](https://github.com/oekazuma/svelte-meta-tags/tree/main/example)

### +layout.svelte

```svelte
<script>
  import { page } from '$app/stores';
  import { MetaTags, deepMerge } from 'svelte-meta-tags';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
```

### +layout.ts

```svelte
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ url }) => {
  const baseMetaTags = Object.freeze({
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
  }) satisfies MetaTagsProps;

  return {
    baseMetaTags
  };
};
```

### +page.ts

```svelte
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
  const pageMetaTags = Object.freeze({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  }) satisfies MetaTagsProps;

  return {
    pageMetaTags
  };
};
```
