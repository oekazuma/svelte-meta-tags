---
title: Additional Meta Tags
---

This allows you to add any other meta tags that are not required by the `config`.

`content` is required. Then either `name`, `property` or `httpEquiv`. (only one of each)

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

One thing to note on this is that it currently only supports unique tags.
This means it will only render one tag per unique `name` / `property` / `httpEquiv`. The last one defined will be rendered.

## Example

If you pass:

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

it will result in this being rendered:

```html
<meta property="dc:creator" content="Jane Doe" />,
```