---
title: Basic
sidebar:
  order: 1
---

## title / titleTemplate

```svelte
<MetaTags title="This is my title" titleTemplate="Svelte Meta Tags | %s" />
<!-- outputs: <title>Svelte Meta Tags | This is my title</title> -->
```

```svelte
<MetaTags title="This is my title" titleTemplate="%s | Svelte Meta Tags" />
<!-- outputs: <title>This is my title | Svelte Meta Tags</title> -->
```

`%s` in `titleTemplate` is replaced with `title` — every occurrence, since the replacement is global. If `title` is not set, `titleTemplate` alone renders no `<title>` tag at all.

## description

```svelte
<MetaTags description="Example Description." />
<!-- outputs: <meta name="description" content="Example Description." /> -->
```

## canonical

```svelte
<MetaTags canonical="https://www.example.com/page" />
<!-- outputs: <link rel="canonical" href="https://www.example.com/page" /> -->
```

## robots

```svelte
<MetaTags robots="noindex,nofollow" />
```

Defaults to `index,follow` — a `<meta name="robots">` tag is rendered even if you don't pass `robots` at all. Set `robots={false}` to suppress the tag entirely:

```svelte
<MetaTags robots={false} />
<!-- no <meta name="robots"> tag is rendered -->
```

> Setting `additionalRobotsProps` while `robots` is `false` (or otherwise falsy) logs a console warning, since the extra directives would have nothing to attach to. See [Additional Robots Props](/meta-tags-properties/additional-robots-props).

## keywords

```svelte
<MetaTags keywords={['svelte', 'seo', 'meta tags']} />
<!-- outputs: <meta name="keywords" content="svelte, seo, meta tags" /> -->
```
