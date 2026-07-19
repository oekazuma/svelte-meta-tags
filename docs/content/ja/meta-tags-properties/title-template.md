---
title: Title Template
sidebar:
  order: 2
---

`%s` をタイトル文字列に置き換えます。

```
title = 'This is my title'
titleTemplate = 'Svelte Meta Tags | %s'
// 出力: Svelte Meta Tags | This is my title
```

```
title = 'This is my title'
titleTemplate = '%s | Svelte Meta Tags'
// 出力: This is my title | Svelte Meta Tags
```
