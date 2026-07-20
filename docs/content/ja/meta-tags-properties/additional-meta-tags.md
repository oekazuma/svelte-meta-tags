---
title: Additional Meta Tags
sidebar:
  order: 70
---

このライブラリでカバーしていない他のメタタグを追加できます。

`content` が必要です。次に、`name`、`property`、または `httpEquiv` のいずれかが必要です (それぞれ 1 つのみ)

`httpEquiv` は `httpEquiv` としてではなく、HTML属性 `http-equiv` としてレンダリングされます。これは `additionalMetaTags` のフィールド名の中で、属性名と1対1で対応しない唯一の項目です。

## 例

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    name: 'application-name',
    content: 'Svelte-Meta-Tags'
  },
  {
    httpEquiv: 'x-ua-compatible',
    content: 'IE=edge; chrome=1'
  }
]}
```

## 無効な例

これらは、同じエントリに `name`、`property`、`httpEquiv` が複数含まれているため無効です。

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    name: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    property: 'application-name',
    httpEquiv: 'application-name',
    content: 'Svelte-Meta-Tags'
  }
]}
```

## タグの重複

`additionalMetaTags` の各エントリは、それぞれ独立した `<meta>` タグとしてレンダリングされます。重複排除は行われません。同じ `name` / `property` / `httpEquiv` を持つ 2 つのエントリを渡すと、**両方**がレンダリングされます:

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'John Doe'
  },
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  }
]}
```

レンダリングされる結果:

```html
<meta property="dc:creator" content="John Doe" /> <meta property="dc:creator" content="Jane Doe" />
```

`deepMerge` でベースとページのメタタグを結合する場合、配列は連結ではなく**置換**されます。つまりページ側の `additionalMetaTags` はレイアウト側のものを丸ごと置き換えるため、両階層を結合したときに生じる重複は避けられます。ただし同一の `additionalMetaTags` 配列内の重複までは解消されないため、配列を書く際にご自身で避ける必要があります。
