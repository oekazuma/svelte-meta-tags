---
title: Basic
sidebar:
  order: 20
---

No `og:*` tag is rendered unless the `openGraph` prop is present. `og:title` falls back to `title` and `og:description` to `description`, but those fallbacks only apply inside the `openGraph` block — a page that sets just `title` and `description` emits no OpenGraph tags. Pass `openGraph={{}}` to opt in on the fallbacks alone.

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    type: 'website',
    url: 'https://www.example.com/page',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt'
      },
      {
        url: 'https://www.example.ie/og-image-2.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt 2'
      }
    ]
  }}
/>
```

## Single image shortcut

When you only have one image, you can use `image` instead of `images`. This is convenient because most social media cards display only the first image.

```svelte
<MetaTags
  openGraph={{
    image: {
      url: 'https://www.example.ie/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Og Image Alt'
    }
  }}
/>
```

If both `image` and `images` are provided, `image` is rendered first, followed by the items in `images`.
