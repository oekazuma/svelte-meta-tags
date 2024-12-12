---
title: Additional Meta Tags
sidebar:
  order: 7
---

このライブラリでカバーしていない他のメタタグを追加できます。

`content` が必要です。次に、`name`、`property`、または `httpEquiv` のいずれかが必要です (それぞれ 1 つのみ)

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

この点について注意すべき点は、現在、一意のタグのみがサポートされていることです。
つまり、一意の `name` / `property` / `httpEquiv` ごとに 1 つのタグのみがレンダリングされます。最後に定義されたタグがレンダリングされます。

## 例

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

レンダリングされる結果

```html
<meta property="dc:creator" content="Jane Doe" />,
```
