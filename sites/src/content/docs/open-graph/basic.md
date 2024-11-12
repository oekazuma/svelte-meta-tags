---
title: Basic
---

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
