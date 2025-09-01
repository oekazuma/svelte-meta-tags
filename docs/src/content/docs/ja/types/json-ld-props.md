---
title: JsonLdProps
sidebar:
  order: 2
---

```ts
interface JsonLdProps {
  output?: 'head' | 'body';
  schema?:
    | FlexibleSchema
    | WithInputOutputProperties<FlexibleSchema>
    | FlexibleSchema[]
    | WithInputOutputProperties<FlexibleSchema>[]
    | GraphWrappedThing;
}
```
