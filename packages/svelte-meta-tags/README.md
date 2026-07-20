# svelte-meta-tags

Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.

## Install

```sh
npm install -D svelte-meta-tags
```

```sh
pnpm add -D svelte-meta-tags
```

## Usage

Add `<MetaTags>` to any page or layout:

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="My Page"
  description="A short description of this page."
  canonical="https://example.com/my-page"
  openGraph={{
    title: 'My Page',
    description: 'A short description of this page.',
    images: [{ url: 'https://example.com/og-image.jpg', width: 1200, height: 630, alt: 'My Page' }]
  }}
/>
```

This renders `<title>`, `<meta name="description">`, `<link rel="canonical">`, and the `og:*` tags into `<svelte:head>`.

## Documentation

Full property reference, JSON-LD support, and the layout/page merging pattern: https://oekazuma.github.io/svelte-meta-tags/

## Repository

https://github.com/oekazuma/svelte-meta-tags
