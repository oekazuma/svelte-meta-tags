---
title: LinkTag
sidebar:
  order: 10
---

```ts
interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  title?: string;
  media?: string;
  sizes?: string;
  type?: string;
  color?: string;
  imagesrcset?: string;
  imagesizes?: string;
  integrity?: string;
  as?:
    | 'fetch'
    | 'audio'
    | 'audioworklet'
    | 'document'
    | 'embed'
    | 'font'
    | 'frame'
    | 'iframe'
    | 'image'
    | 'json'
    | 'manifest'
    | 'object'
    | 'paintworklet'
    | 'report'
    | 'script'
    | 'serviceworker'
    | 'sharedworker'
    | 'style'
    | 'track'
    | 'video'
    | 'webidentity'
    | 'worker'
    | 'xslt';
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: ReferrerPolicy;
}
```

`referrerPolicy` は DOM 組み込みの `ReferrerPolicy` 型（`'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'`）を使用します。

使い方は[Additional Link Tags](/ja/meta-tags-properties/additional-link-tags)を参照してください。
