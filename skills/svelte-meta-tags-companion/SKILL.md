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

`deepMerge` correctly merges nested objects (like `openGraph` itself — its individual fields such as `title` or `description` merge independently rather than one override replacing the whole object), replaces arrays instead of concatenating them (e.g. `openGraph.images`), and keeps a `Date` or function already on the **target** rather than letting the source overwrite it — the reverse of its usual source-wins rule. A shallow spread silently drops nested overrides; third-party merge libraries don't know about these library-specific rules.

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

### 5. Passing more than two objects to `deepMerge`

```ts
// ❌ Wrong: deepMerge takes exactly (target, source) — the third argument is ignored, silently
const metaTags = deepMerge(siteMetaTags, sectionMetaTags, pageMetaTags);

// ✅ Correct: chain it
const metaTags = deepMerge(deepMerge(siteMetaTags, sectionMetaTags), pageMetaTags);
```

TypeScript flags the extra argument, so this only slips through in a `.svelte` file without `lang="ts"` — which is exactly where layout wiring tends to live.

Note also that `deepMerge` iterates the source with `Object.entries`, so **symbol keys on the source are dropped**. Meta tag props are string-keyed, so this only matters if you are merging your own data through the same helper.

## Why a tag isn't rendering

These are not wrong code — they are correct-looking props that produce no output. Check them before assuming a bug in the library.

### `og:*` and `twitter:*` need their prop object to exist at all

```svelte
<!-- ❌ No og:title / og:description is rendered — the whole openGraph block is skipped -->
<MetaTags title="My Page" description="A short description." />

<!-- ✅ og:title falls back to the (templated) title, og:description to description -->
<MetaTags title="My Page" description="A short description." openGraph={{}} />
```

`<MetaTags>` guards the entire OpenGraph block behind `{#if openGraph}` and the Twitter block behind `{#if twitter}`. The documented fallbacks (`og:title` → `title`, `twitter.title` → `openGraph.title` → `title`) only apply _inside_ those blocks, so a page that sets just `title` and `description` emits no social tags at all.

### `titleTemplate` alone renders no `<title>`

```svelte
<!-- ❌ No <title> at all — the template is not applied on its own -->
<MetaTags titleTemplate="%s | My Site" description="About us." />
```

When `title` is missing, `<MetaTags>` skips the `<title>` element entirely rather than rendering the bare template. A base layout that sets only `titleTemplate` therefore produces no title on any page that forgets its own — give the base layout a `title` too, so the merged result always has one.

### Falsy `additionalRobotsProps` values are dropped

```svelte
<!-- ❌ Emits nothing: 0 is falsy, so the directive is skipped -->
<MetaTags additionalRobotsProps={{ maxSnippet: 0 }} />

<!-- ✅ -1 is truthy and renders as max-snippet:-1 -->
<MetaTags additionalRobotsProps={{ maxSnippet: -1 }} />
```

Every directive is included only when its value is truthy. `-1` (the "no limit" value for `maxSnippet` and `maxVideoPreview`) works; `0` does not.

### `robots={false}` suppresses the tag, and `additionalRobotsProps` with it

Setting `robots={false}` removes `<meta name="robots">` entirely. Combining it with `additionalRobotsProps` logs a `console.warn`, but that warning comes from an `$effect` — it does not run during SSR, so on a server-rendered page nothing surfaces at all. Drop one of the two props.

### `openGraph.image` is a shortcut for a single image

```svelte
<!-- `image` is prepended to `images`; both render as og:image -->
<MetaTags openGraph={{ image: { url: 'https://example.com/og.jpg' } }} />
```

If you already build an `images` array, keep using it — but a single-image page doesn't need one.

## Suggestion (not a bug)

If `+layout.ts`/`+page.ts` `load` functions return plain objects instead of using `defineBaseMetaTags`/`definePageMetaTags`, suggest switching to them for type safety and immutability (`Object.freeze`) — but this is optional, not a correctness issue:

```ts
// Works, but not type-checked against MetaTagsProps and not frozen
export const load = () => ({ baseMetaTags: { title: 'My Site' } });

// Recommended: typed + frozen
import { defineBaseMetaTags } from 'svelte-meta-tags';
export const load = () => ({ ...defineBaseMetaTags({ title: 'My Site' }) });
```
