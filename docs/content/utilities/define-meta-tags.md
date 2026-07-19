---
title: Define Meta Tags
sidebar:
  order: 2
---

`defineBaseMetaTags` and `definePageMetaTags` are thin wrappers used in SvelteKit `load` functions. Each one just freezes your input object and wraps it under a named property:

```ts
const defineBaseMetaTags = (obj: MetaTagsProps) => ({ baseMetaTags: Object.freeze(obj) });
const definePageMetaTags = (obj: MetaTagsProps) => ({ pageMetaTags: Object.freeze(obj) });
```

They exist purely to type and shape your `load` return value — there's no other behavior. You can skip them entirely and write the equivalent by hand:

```ts
// +layout.ts, without defineBaseMetaTags
export const load = () => {
  return { baseMetaTags: Object.freeze<MetaTagsProps>({ title: 'Default' }) };
};
```

## Usage

```ts
// +layout.ts
import { defineBaseMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const baseTags = defineBaseMetaTags({
    title: 'Default',
    description: 'Welcome to my application'
  });

  return { ...baseTags };
};
```

```ts
// +page.ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageTags = definePageMetaTags({
    title: 'About Us',
    description: 'Learn more about our company'
  });

  return { ...pageTags };
};
```

Combine the two with [`deepMerge`](/utilities/deep-merge) in your root `+layout.svelte`.
