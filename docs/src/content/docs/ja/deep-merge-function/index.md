---
title: Deep Merge 関数
sidebar:
  badge:
    text: 新機能
    variant: tip
---

2つ以上のオブジェクトの列挙可能なプロパティを深くマージする関数を提供します。

次の例のように、子ページのデフォルト値をオーバーライドしたい場合に使用します。

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
  return {
    ...defineBaseMetaTags({
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
    })
  };
};
```

## +page.ts

```ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  return {
    ...definePageMetaTags({
      title: 'TOP',
      description: 'Description TOP',
      openGraph: {
        title: 'Open Graph Title TOP',
        description: 'Open Graph Description TOP'
      }
    })
  };
};
```
