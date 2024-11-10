---
title: Additional Link Tags
---

This allows you to add any other link tags that are not covered in the `config`.

`rel` and `href` is required.

## Example

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

it will result in this being rendered:

```html
<link rel="icon" href="https://www.test.ie/favicon.ico" />
<link rel="apple-touch-icon" href="https://www.test.ie/touch-icon-ipad.jpg" sizes="76x76" />
<link rel="manifest" href="https://www.test.ie/manifest.json" />
```