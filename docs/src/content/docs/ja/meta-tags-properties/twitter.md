---
title: Twitter
sidebar:
  order: 3
---

## 例

```js
twitter={{
  creator: '@handle',
  site: '@site',
  cardType: 'summary_large_image',
  title: 'Twitter',
  description: 'Twitter',
  image: 'https://www.example.ie/twitter-image.jpg',
  imageAlt: 'Twitter image alt'
}}
```

## フォールバック動作

`twitter` プロパティで `twitter.title` や `twitter.description` が明示的に設定されていない場合、他の利用可能な値に自動的にフォールバックします:

- `twitter.title` → `openGraph.title` → `title`
- `twitter.description` → `openGraph.description` → `description`

これにより、同じ値をメタタグ間で共有する場合に重複を避けることができます:

```svelte
<MetaTags
  title="Page Title"
  description="Page Description"
  openGraph={{ title: 'OG Title', description: 'OG Description' }}
  twitter={{ cardType: 'summary_large_image' }}
/>
<!-- twitter:title は "OG Title" になります -->
<!-- twitter:description は "OG Description" になります -->
```

詳細については、X(Twitter)の[ドキュメント](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary)を参照してください。
