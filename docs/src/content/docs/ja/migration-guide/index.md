---
title: 移行ガイド
---

`twitter.handle` は `twitter.creator` に名前が変更されました。
この変更は実際のプロパティ名と一致します。

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

2つ以上のオブジェクトの列挙可能なプロパティを深くマージする関数`deepMerge`を追加しました・

ライブラリが提供する`deepMerge`関数の使用は必須ではないため、好きなものを使い続けることができますが、依存関係が減るためおすすめします。

使用方法の詳細については [例](https://github.com/oekazuma/svelte-meta-tags/tree/main/example/src/routes) を参照してください。

## v3

`+layout.svelte`

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';
  import extend from 'just-extend'; //lodash.merge、deepmerge、just-extendなどのオブジェクトのディープマージを可能にする関数を使用してください

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
  import { page } from '$app/state';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
```
