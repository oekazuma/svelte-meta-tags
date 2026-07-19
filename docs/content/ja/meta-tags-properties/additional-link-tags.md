---
title: Additional Link Tags
sidebar:
  order: 8
---

このライブラリでカバーしていない他のリンクタグを追加できます。

`rel` と `href`が必要です。

## 例

```js
additionalLinkTags={[
  {
    rel: 'icon',
    href: 'https://www.test.ie/favicon.ico'
  },
  {
    rel: 'apple-touch-icon',
    href: 'https://www.test.ie/touch-icon-ipad.jpg',
    sizes: '76x76'
  },
  {
    rel: 'manifest',
    href: 'https://www.test.ie/manifest.json'
  }
]}
```

結果は次のようになります

```html
<link rel="icon" href="https://www.test.ie/favicon.ico" />
<link rel="apple-touch-icon" href="https://www.test.ie/touch-icon-ipad.jpg" sizes="76x76" />
<link rel="manifest" href="https://www.test.ie/manifest.json" />
```
