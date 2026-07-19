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

`referrerPolicy` uses the DOM's built-in `ReferrerPolicy` type (`'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'`).

See [Additional Link Tags](/meta-tags-properties/additional-link-tags) for usage.
