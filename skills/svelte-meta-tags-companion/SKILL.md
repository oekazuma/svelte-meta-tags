---
name: svelte-meta-tags-companion
description: Use when writing or reviewing code that imports from svelte-meta-tags (MetaTags, JsonLd, deepMerge, defineBaseMetaTags, definePageMetaTags) in an already-set-up project.
---

# svelte-meta-tags: Companion

## When to use

This is a reference for catching common mistakes — not a setup guide (see the `svelte-meta-tags-setup` skill for that).

## Common mistakes

### 1. Importing `page` from `$app/stores` instead of `$app/state`

```svelte
<!-- ❌ Wrong: pre-Svelte-5 API, requires a {#key $page} wrapper to stay reactive -->
<script>
  import { page } from '$app/stores';
  import { deepMerge } from 'svelte-meta-tags';

  export let data;

  $: metaTags = deepMerge(data.baseMetaTags, $page.data.pageMetaTags);
</script>
```

```svelte
<!-- ✅ Correct: Svelte 5 API, $derived tracks page changes correctly with no extra wrapping -->
<script>
  import { page } from '$app/state';
  import { deepMerge } from 'svelte-meta-tags';

  let { data } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>
```

### 2. Hand-rolling the merge instead of using `deepMerge`

```ts
// ❌ Wrong: a shallow spread does not deep-merge nested objects like `openGraph`
const metaTags = { ...baseMetaTags, ...pageMetaTags };

// ❌ Wrong: pulling in a third-party deep-merge library adds an unnecessary dependency
import extend from 'just-extend';
const metaTags = extend(true, {}, baseMetaTags, pageMetaTags);

// ✅ Correct: use the library's own deepMerge
import { deepMerge } from 'svelte-meta-tags';
const metaTags = deepMerge(baseMetaTags, pageMetaTags);
```

`deepMerge` correctly merges nested objects (like `openGraph` itself — its individual fields such as `title` or `description` merge independently rather than one override replacing the whole object), replaces arrays instead of concatenating them (e.g. `openGraph.images`), and has defined precedence rules for `Date`/function values. A shallow spread silently drops nested overrides; third-party merge libraries don't know about these library-specific rules.

### 3. Spreading the wrong prop into `<MetaTags>`

```svelte
<!-- ❌ Wrong: MetaTags has no `metaTags` prop -->
<MetaTags {metaTags} />

<!-- ✅ Correct: spread the merged object as props -->
<MetaTags {...metaTags} />
```

### 4. Re-implementing the Twitter/OpenGraph fallback chain

```ts
// ❌ Wrong: MetaTags already does this internally
const twitterTitle = twitter?.title ?? openGraph?.title ?? title;
```

`<MetaTags>` already falls back `twitter.title → openGraph.title → title` (using the title with `titleTemplate` applied, and the same shape for `description`) — don't compute this yourself before passing props in.

## Suggestion (not a bug)

If `+layout.ts`/`+page.ts` `load` functions return plain objects instead of using `defineBaseMetaTags`/`definePageMetaTags`, suggest switching to them for type safety and immutability (`Object.freeze`) — but this is optional, not a correctness issue:

```ts
// Works, but not type-checked against MetaTagsProps and not frozen
export const load = () => ({ baseMetaTags: { title: 'My Site' } });

// Recommended: typed + frozen
import { defineBaseMetaTags } from 'svelte-meta-tags';
export const load = () => ({ ...defineBaseMetaTags({ title: 'My Site' }) });
```
