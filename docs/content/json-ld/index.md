---
title: JSON-LD
---

`JsonLd` renders a `<script type="application/ld+json">` block from a plain object, an array of objects, or a `schema-dts` typed object.

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Organization',
    name: 'Example Corp',
    url: 'https://www.example.com'
  }}
/>
<!-- outputs: <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization",...}</script> -->
```

`@context: "https://schema.org"` is added automatically — you never need to include it yourself.

## output: "head" vs "body"

`output` defaults to `"head"`, which renders the `<script>` tag inside `<svelte:head>`. Set `output="body"` to render it inline at the component's location instead (useful when you need the structured data to appear at a specific point in the DOM, e.g. next to the content it describes):

```svelte
<JsonLd output="body" schema={{ '@type': 'Organization', name: 'Example Corp' }} />
```

## Multiple schemas

Pass an array to render multiple JSON-LD objects within the same `<script>` block, or wrap them in `{ '@graph': [...] }` to represent them as a single linked graph instead of a plain array (recommended — some tools, like Safari, log a console error for the array form even though it works correctly). See [JSON-LD Multiple Examples](/json-ld/json-ld-properties/json-ld-multiple-examples).

## TypeScript support

This library uses [schema-dts](https://github.com/google/schema-dts) for the `schema` prop's types, so every schema.org type — beyond the examples in this section — is available and type-checked. To discover available schema types, see [Google's Search Gallery](https://developers.google.com/search/docs/guides/search-gallery).
