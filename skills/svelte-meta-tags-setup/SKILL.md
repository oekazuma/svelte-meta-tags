---
name: svelte-meta-tags-setup
description: Use when adding svelte-meta-tags, or SEO / meta tag / Open Graph (OGP) / social preview support, to a Svelte/SvelteKit project for the first time.
---

# svelte-meta-tags: Setup

## Step 1: Install the package

Check whether `svelte-meta-tags` is already in `package.json`. If it is, skip to Step 2.

If it isn't, pick the command from the project's lockfile — not from whatever package manager happens to be installed globally:

| Lockfile                               | Command                                   |
| -------------------------------------- | ----------------------------------------- |
| `pnpm-lock.yaml`                       | `pnpm add -D svelte-meta-tags`            |
| `package-lock.json`                    | `npm install --save-dev svelte-meta-tags` |
| `yarn.lock`                            | `yarn add --dev svelte-meta-tags`         |
| `bun.lock` (or the legacy `bun.lockb`) | `bun add --dev svelte-meta-tags`          |

If none of these lockfiles exists, fall back to the `packageManager` field in `package.json`; if that is absent too, ask which package manager to use rather than guessing.

Install it as a **dev** dependency: the components compile into the consuming app, so nothing from this package is needed at runtime.

## Step 2: Detect whether this is a SvelteKit project

Check for `@sveltejs/kit` in `package.json` dependencies/devDependencies, and for a `src/routes/` directory.

**If this is NOT a SvelteKit project** (plain Svelte, or another framework/router): skip the rest of this skill. Import `MetaTags` and pass props directly to it from whatever data-fetching mechanism the project already uses:

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="My Page" description="A short description of this page." />
```

Do not introduce `deepMerge`, `defineBaseMetaTags`, or `definePageMetaTags` — those exist specifically for SvelteKit's `load`-based data flow across `+layout.ts`/`+page.ts`, and add unnecessary complexity outside that context.

**If this IS a SvelteKit project**, continue to Step 3.

## Step 3: Find or create the base layout `load` file

Look for `src/routes/+layout.ts` (or `+layout.server.ts` if the project uses server-only data).

- **If it exists**: read it. If its `load` function already returns other data, merge `defineBaseMetaTags`'s result into the existing return object — do not overwrite unrelated fields.
- **If it doesn't exist**: create it.

The base layout file should look like this:

```ts
// src/routes/+layout.ts
import { defineBaseMetaTags } from 'svelte-meta-tags';

export const load = () => {
  return {
    ...defineBaseMetaTags({
      title: 'My Site',
      titleTemplate: '%s | My Site',
      description: 'Default description for pages that do not set their own.'
    })
  };
};
```

## Step 4: Check for nested layouts

Look for additional `+layout.ts` files in nested route directories (e.g. `src/routes/blog/+layout.ts`). If a section of the site needs its own base tags on top of the root layout's, chain `deepMerge` calls rather than duplicating `defineBaseMetaTags` calls:

```ts
// src/routes/blog/+layout.ts
import { deepMerge, defineBaseMetaTags } from 'svelte-meta-tags';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
  const { baseMetaTags } = await parent();
  return {
    ...defineBaseMetaTags(
      deepMerge(baseMetaTags, {
        titleTemplate: '%s | Blog | My Site'
      })
    )
  };
};
```

When a nested layout overrides `baseMetaTags` like this, wire Step 6 with `page.data.baseMetaTags` instead of `data.baseMetaTags`. A layout's `data` prop only contains its own and ancestor `load` results — a child layout's override never reaches the root layout through `data`. It only surfaces through `page.data`, which merges every `load` on the current page with the deepest one winning.

If there are no nested layouts, skip this step — the standard two-layer (base + page) pattern from Step 3 and Step 5 is enough.

## Step 5: Add page-level tags with `definePageMetaTags`

In the relevant `+page.ts` (or `+page.server.ts`), return page-specific overrides:

```ts
// src/routes/+page.ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  return {
    ...definePageMetaTags({
      title: 'Home',
      description: 'Welcome to my site.'
    })
  };
};
```

Not every route needs its own `+page.ts` — only add one where the page needs to override the base tags.

## Step 6: Wire up `+layout.svelte`

```svelte
<script>
  import { page } from '$app/state';
  import { MetaTags, deepMerge } from 'svelte-meta-tags';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
```

Import `page` from **`$app/state`**, not `$app/stores` — the store-based module is deprecated since SvelteKit 2.12 and `$app/state` is its Svelte 5 replacement.

If Step 4 added nested-layout overrides, read the base tags from `page.data` instead, so section-level overrides actually reach this component:

```js
let metaTags = $derived(deepMerge(page.data.baseMetaTags, page.data.pageMetaTags));
```

## Step 7: JSON-LD (optional)

If the project needs structured data (e.g. for rich search results), mention that `<JsonLd schema={...} />` exists as a separate component and point to https://oekazuma.github.io/svelte-meta-tags/json-ld/ for details — don't design a JSON-LD schema as part of this setup flow.

## Step 8: Verify

Run the project's typecheck command (e.g. `pnpm check`, `svelte-check`, or whatever `package.json` defines) and confirm it passes with no new errors before considering the setup done.
