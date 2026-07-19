---
title: Define Meta Tags
sidebar:
  order: 2
---

`defineBaseMetaTags` と `definePageMetaTags` は、SvelteKit の `load` 関数内で使う薄いラッパーです。それぞれ、入力したオブジェクトを凍結（freeze）して名前付きプロパティでラップするだけの関数です。

```ts
const defineBaseMetaTags = (obj: MetaTagsProps) => ({ baseMetaTags: Object.freeze(obj) });
const definePageMetaTags = (obj: MetaTagsProps) => ({ pageMetaTags: Object.freeze(obj) });
```

これらは `load` の戻り値に型と形を与えるためだけに存在しており、それ以外の挙動はありません。使わずに、同等の処理を自分で書くこともできます。

```ts
// +layout.ts, defineBaseMetaTagsを使わない場合
export const load = () => {
  return { baseMetaTags: Object.freeze<MetaTagsProps>({ title: 'Default' }) };
};
```

## 使い方

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

ルートの `+layout.svelte` で、この2つを [`deepMerge`](/ja/utilities/deep-merge) と組み合わせて使用します。
