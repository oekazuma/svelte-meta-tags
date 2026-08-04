# Svelte Meta Tags Contributing Guide

Hi! We are really excited that you are interested in contributing to Svelte Meta Tags. Before submitting your contribution, please make sure to take a moment and read through the following guide:

## Project Set Up

It requires the use of [pnpm](https://pnpm.js.org/en/). You can [install pnpm](https://pnpm.io/installation) with:

```bash
npm i -g pnpm
```

1. Pull the repo and install the dependencies:

```
git clone git@github.com:oekazuma/svelte-meta-tags.git
pnpm install
```

2. Make your modifications / additions
3. Update / Add Documentation
4. Write / Update Tests. See [Testing](#testing) for which layer a test belongs in.
5. Run the same checks CI runs before opening a pull request:

```bash
pnpm lint    # prettier --check . && eslint .
pnpm check   # svelte-kit sync && svelte-check
pnpm test    # vitest + Playwright
```

Run `pnpm format` to auto-fix Prettier issues found by `pnpm lint`.

6. Open pull request

## Work with Svelte Meta Tags

All the code for the library is located in the `packages/svelte-meta-tags/src/lib` directory.

The `tests/svelte-5/src/routes` directory contains a fully working SvelteKit app. This will be used for end-to-end testing. You can run `pnpm dev` to run this app. You can also run it in a production build by running `pnpm build` and `pnpm preview`.

## Testing

Tests live in two layers. Put a test in the lowest layer that can actually observe the behavior.

### Vitest — the default

`packages/svelte-meta-tags/tests/` runs against the source with no build and no browser, so the whole suite finishes in well under a second.

```bash
pnpm --filter svelte-meta-tags test
pnpm --filter svelte-meta-tags exec vitest run tests/metaTags/twitter.test.ts   # single file
```

This is where **most tests belong**, including tests for the components:

- `.ts` modules (`deepMerge`, `define`, `robots`) are called directly.
- `<MetaTags>` and `<JsonLd>` are rendered in process with `render()` from `svelte/server`, and the markup they produced is parsed and asserted. `tests/helpers/head.ts` provides `renderHead` / `renderBody`, plus `metaContent`, `metaContents`, `metaTags` and `links` to read tags back out.

Adding a meta tag, changing a fallback chain or fixing an escaping bug needs a test here — and usually nothing else.

### Playwright — only when the browser matters

`tests/svelte-5/` builds the library, builds a SvelteKit app against `dist/`, serves it and drives real browsers. That is slow, so keep it for things Vitest genuinely cannot see:

```bash
pnpm --filter svelte-5 test                                   # chromium + firefox + webkit
pnpm --filter svelte-5 exec playwright test --project=chromium
```

- `$effect` does not run during server rendering, so effect-driven behavior (such as the `additionalRobotsProps` warning) is only observable here.
- Client-side navigation, hydration and anything that depends on a real DOM.
- A smoke check that tags actually reach `<head>` in a real browser.

**`tests/svelte-5` resolves `svelte-meta-tags` from `dist/`**, so run `pnpm package` after changing library source or you will be testing stale output.

Run the same checks CI runs before opening a pull request — see step 5 above.

## Releases

The [Changesets GitHub action](https://github.com/changesets/action#with-publishing) will create and update a PR that applies changesets and publishes new versions of changed packages to npm.
