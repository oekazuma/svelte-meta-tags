---
title: Basic
sidebar:
  order: 2
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

### 単一画像のショートカット

画像が 1 枚だけの場合は、`images` の代わりに `image` を使用できます。多くの SNS カードは最初の画像のみを表示するため、この記法が便利です。

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

`image` と `images` の両方を指定した場合、`image` が最初に出力され、続いて `images` の各要素が出力されます。
