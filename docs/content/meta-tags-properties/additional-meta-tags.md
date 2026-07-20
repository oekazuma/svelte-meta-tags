---
title: Additional Meta Tags
sidebar:
  order: 70
---

This allows you to add any other meta tags that are not required by the `config`.

`content` is required. Then either `name`, `property` or `httpEquiv`. (only one of each)

`httpEquiv` is rendered as the `http-equiv` HTML attribute (not `httpEquiv`) — this is the one field name in `additionalMetaTags` that doesn't map 1:1 to its attribute name.

## Example

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    name: 'application-name',
    content: 'Svelte-Meta-Tags'
  },
  {
    httpEquiv: 'x-ua-compatible',
    content: 'IE=edge; chrome=1'
  }
]}
```

## Invalid Examples

These are invalid because they contain more than one of `name`, `property`, and `httpEquiv` in the same entry.

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    name: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    property: 'application-name',
    httpEquiv: 'application-name',
    content: 'Svelte-Meta-Tags'
  }
]}
```

## Duplicate tags

Each entry in `additionalMetaTags` renders its own `<meta>` tag — there is no deduplication. If you pass two entries with the same `name` / `property` / `httpEquiv`, **both** are rendered:

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'John Doe'
  },
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  }
]}
```

renders:

```html
<meta property="dc:creator" content="John Doe" /> <meta property="dc:creator" content="Jane Doe" />
```

If you combine base and page meta tags with `deepMerge`, arrays are **replaced**, not concatenated — so a page-level `additionalMetaTags` fully replaces the layout-level one, which is the intended way to avoid duplicates.
