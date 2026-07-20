---
title: 移行ガイド
sidebar:
  order: 30
---

## v5

`JsonLd` の `schema` プロパティの型を提供するパッケージ `schema-dts` が v1 から v2 に更新されました。`JsonLd` のランタイムの挙動に変更はなく、これは型レベルのみの破壊的変更です。

- アプリが `schema-dts` に直接依存している場合は、`^2.0.0` に更新してください。v1 と v2 の型が混在すると、`schema` プロパティへの代入時に TypeScript の "Excessive stack depth" エラーが発生することがあります。
- `schema-dts` v2 には独自の破壊的な型変更があります（`Role` の非再帰化、コアの DataType としての `Quantity`、schema.org 以外の型エクスポートのリネームなど）。詳細は [schema-dts v2.0.0 のリリースノート](https://github.com/google/schema-dts/releases/tag/v2.0.0) を参照してください。
- `schema-dts` v2 は `schema-dts-lib` に依存しており、これは `typescript >=4.9.5` をピア依存関係として宣言しています。厳格なピア依存関係の検証を行う環境（例: pnpm の `strict-peer-dependencies=true`）では、`typescript` を明示的に追加する必要がある場合があります。

## v4

### `twitter.handle` を `twitter.creator` にリネーム

この変更は実際のプロパティ名と一致します。

**変更前 (v3)**

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

**変更後 (v4)**

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

### `deepMerge` を追加

`deepMerge`は、2つ以上のオブジェクトの列挙可能なプロパティを深くマージする関数です。

ライブラリが提供する `deepMerge` 関数の使用は必須ではないため、好きなものを使い続けることができますが、依存関係が減るためおすすめします。

使用方法の詳細については [例](https://github.com/oekazuma/svelte-meta-tags/tree/main/example/src/routes) を参照してください。

**変更前 (v3)**

`+layout.svelte`

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';
  import extend from 'just-extend'; // lodash.merge、deepmerge、just-extendなどのオブジェクトのディープマージを可能にする関数を使用してください

  export let data;

  $: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<MetaTags {...metaTags} />

<slot />
```

**変更後 (v4)**

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
