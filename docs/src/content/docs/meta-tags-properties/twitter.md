---
title: Twitter
sidebar:
  order: 3
---

## Example

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

## Fallback Behavior

When `title` or `description` is not explicitly set in the `twitter` prop, they automatically fall back to other available values:

- `twitter.title` → `openGraph.title` → `title`
- `twitter.description` → `openGraph.description` → `description`

This allows you to avoid duplication when the same values are shared across meta tags:

```svelte
<MetaTags
  title="Page Title"
  description="Page Description"
  openGraph={{ title: 'OG Title', description: 'OG Description' }}
  twitter={{ cardType: 'summary_large_image' }}
/>
<!-- twitter:title will be "OG Title" -->
<!-- twitter:description will be "OG Description" -->
```

See out the X(Twitter) [documentation](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary) for more information.
