---
title: Alternates
sidebar:
  order: 60
---

Use `mobileAlternate` and `languageAlternates` to point search engines at related versions of the current page.

## Mobile alternate

Indicates a relationship between this desktop page and a separate mobile version, for the screen sizes where the mobile version should be served:

```svelte
<MetaTags
  mobileAlternate={{
    media: 'only screen and (max-width: 640px)',
    href: 'https://m.example.com/page'
  }}
/>
<!-- outputs: <link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.example.com/page" /> -->
```

## Language alternates

An array of `{ hrefLang, href }` pairs — one `<link rel="alternate" hrefLang="...">` is rendered per entry:

```svelte
<MetaTags
  languageAlternates={[
    { hrefLang: 'de-AT', href: 'https://www.example.com/de' },
    { hrefLang: 'fr-FR', href: 'https://www.example.com/fr' }
  ]}
/>
```
