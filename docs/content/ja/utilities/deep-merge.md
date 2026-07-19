---
title: Deep Merge
sidebar:
  order: 10
---

`deepMerge(target, source)` は、`MetaTagsProps` 形式の2つのオブジェクトを深くマージします。次の例のように、レイアウトのデフォルトのメタタグをページ固有の値で上書きしたいときに使用します。

## マージのルール

`deepMerge` は各プロパティに対して、次のルールを順番に適用します。

1. `target` または `source` が `null`/`undefined` の場合、もう一方の値がそのまま返されます（両方とも存在しない場合は `{}` が返されます）。
2. **target** の値が `Date` インスタンスまたは関数の場合、target の値が優先されます — source の値が `Date`/関数であっても無視されます。
3. そうでない場合、**source** の値が `Date` インスタンスまたは関数であれば、source の値が優先されます。
4. 両方の値が（配列ではない）null以外のオブジェクトの場合（単純なオブジェクトリテラルだけでなく、`Date`以外のクラスインスタンスも含みます）、再帰的にマージされます。
5. 両方の値が配列の場合、**source の配列が target の配列を完全に置き換えます** — 配列が連結されることはありません。
6. それ以外の場合、source の値が `undefined` でない限り source の値が使用され、`undefined` の場合は target の値が保持されます。

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
//   title: 'Default Title',                                          // sourceがundefinedなのでtargetが保持される
//   description: 'Page Description',                                 // sourceが優先される
//   openGraph: { images: [{ url: 'https://example.com/page.jpg' }] } // 配列は連結されず置き換えられる
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

`defineBaseMetaTags`/`definePageMetaTags` が実際に何をしているかは [Define Meta Tags](/ja/utilities/define-meta-tags) を参照してください。
