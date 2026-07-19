---
title: JsonLdProps
sidebar:
  order: 20
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
