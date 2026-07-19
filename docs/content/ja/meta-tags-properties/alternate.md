---
title: Alternates
sidebar:
  order: 6
---

`mobileAlternate` と `languageAlternates` を使うと、検索エンジンに現在のページの関連バージョンを伝えることができます。

## Mobile alternate

このデスクトップページと、別途用意されたモバイル版との関係を、モバイル版を配信すべき画面サイズとあわせて示します。

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

`{ hrefLang, href }` のペアの配列です。各エントリごとに `<link rel="alternate" hrefLang="...">` が1つずつレンダリングされます。

```svelte
<MetaTags
  languageAlternates={[
    { hrefLang: 'de-AT', href: 'https://www.example.com/de' },
    { hrefLang: 'fr-FR', href: 'https://www.example.com/fr' }
  ]}
/>
```
