# Svelte Meta Tags Coding Agent Guide

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a **pnpm workspace monorepo**. The pnpm version is pinned via `packageManager` in the root `package.json`, and the Node version via `use-node-version` in `.npmrc` — check those files for the current values. All shared dependency versions live in the `catalog:` block of `pnpm-workspace.yaml`; package `package.json` files reference them via `"catalog:"` and should not pin versions directly.

Workspace members:

- `packages/svelte-meta-tags/` — the published library (the only public package). Source is in `src/lib/`. The package consumes itself via the SvelteKit dev app under `src/routes/` for local iteration.
- `tests/svelte-5/` — a SvelteKit app dedicated to **Playwright e2e tests**. Each route under `src/routes/<feature>/` corresponds to a `tests/<feature>.test.ts` that asserts the rendered `<head>` markup. This is where new feature behavior must be verified (per `CONTRIBUTING.md`).
- `example/` — a runnable SvelteKit demo of the library; not part of the test pipeline.
- `docs/` — Astro + Starlight documentation site (deployed to GitHub Pages by `.github/workflows/deploy-docs.yml` only when `docs/**` changes).

## Common commands

Run from repo root unless noted. All `pnpm -r` scripts iterate workspaces.

```bash
pnpm install               # install workspace deps (uses pnpm catalog)
pnpm dev                   # run dev servers across workspaces
pnpm build                 # build all workspaces
pnpm package               # svelte-kit sync && svelte-package && publint (library output -> packages/svelte-meta-tags/dist)
pnpm check                 # svelte-check across workspaces
pnpm lint                  # prettier --check . && eslint .
pnpm format                # prettier --write .
pnpm test                  # runs every workspace's `test` (vitest in lib, playwright in tests/svelte-5)
```

Per-workspace commands (use these to scope work):

```bash
# Unit tests + benchmarks for deepMerge / define helpers
pnpm --filter svelte-meta-tags test
pnpm --filter svelte-meta-tags test:bench
pnpm --filter svelte-meta-tags exec vitest run tests/deepMerge/deepMerge.test.ts   # single file

# Playwright e2e (chromium / firefox / webkit). vite build && preview is started by playwright.config.ts.
pnpm --filter svelte-5 test
pnpm --filter svelte-5 exec playwright test tests/twitter.test.ts                  # single file
pnpm --filter svelte-5 exec playwright test --project=chromium                     # one browser
```

**`tests/svelte-5` imports `svelte-meta-tags` as `workspace:*` and resolves it from `dist/`.** Run `pnpm package` (or `pnpm --filter svelte-meta-tags package`) first whenever you change library source — CI does this before `pnpm build` and `pnpm test`. Without it, e2e tests will run against stale published artifacts.

## Library architecture

The public surface is intentionally small (`packages/svelte-meta-tags/src/lib/index.ts`):

- **`<MetaTags>`** — single Svelte 5 component (`MetaTags.svelte`) that renders **all** SEO/meta/link/Twitter/OpenGraph/Facebook tags into `<svelte:head>`. It uses runes (`$props`, `$derived`, `$effect`) and accepts `Partial<MetaTagsProps>`. Adding a new meta surface means: extend `types.d.ts`, render the conditional block in `MetaTags.svelte`, add a route under `tests/svelte-5/src/routes/<feature>/` and a corresponding `tests/<feature>.test.ts`.
- **`<JsonLd>`** — renders `application/ld+json` either in `<svelte:head>` (`output="head"`, default) or inline (`output="body"`). The `schema` prop accepts `schema-dts` types, plain objects, arrays (multiple JSON-LD blocks), or a `{ '@graph': [...] }` wrapper. `@context: https://schema.org` is auto-injected. The literal `<script>` string is split (`'<scri' + 'pt'`) on purpose to bypass HTML parser confusion — preserve this when editing.
- **`deepMerge(target, source)`** — recursive merge utility used by consumers to combine `baseMetaTags` (layout) with `pageMetaTags` (page). Arrays are **replaced**, not concatenated; `Date` and functions are passed through as-is.
- **`defineBaseMetaTags` / `definePageMetaTags`** — thin wrappers that `Object.freeze` the input and namespace it under `baseMetaTags` / `pageMetaTags`. They exist solely to type and shape SvelteKit `load` return values; the canonical consumer pattern is:

  ```ts
  // +layout.ts
  export const load = () => ({ ...defineBaseMetaTags({ ... }) });
  // +page.ts
  export const load = () => ({ ...definePageMetaTags({ ... }) });
  // +layout.svelte
  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
  <MetaTags {...metaTags} />
  ```

  The `example/` and `tests/svelte-5/` apps both follow this pattern.

### Behaviors that are easy to break

- **Twitter fallback chain**: `twitter.title || openGraph.title || updatedTitle` (and the same shape for `description`). The `twitterFallback*` test routes lock this in — preserve the precedence when touching `MetaTags.svelte`.
- **`titleTemplate`**: `%s` placeholder is substituted with `title`; if `title` is missing, the raw `title` is used (template is not applied alone).
- **`og:type`-conditional blocks**: `article`, `book`, `profile`, and `video.movie | video.episode | video.tv_show | video.other` each render a distinct sub-block. Adding a new structured type means matching it in the `og:type.toLowerCase()` chain _and_ adding fields to `OpenGraph` in `types.d.ts`.
- **`additionalMetaTags`**: when an entry has `httpEquiv`, it is emitted as `http-equiv` (HTML attribute name). Don't normalize this away.
- **`openGraph.image` vs `openGraph.images`**: `image` (singular) is an alias prepended to `images`; both render as `og:image`. See `openGraphImage.test.ts`.
- **`robots: false`**: suppresses the `<meta name="robots">` tag entirely. Setting `additionalRobotsProps` while `robots` is falsy logs a `console.warn` (covered by `$effect`).

## Releases

Versioning and publishing go through **Changesets**:

1. Add a changeset with `pnpm changeset` describing the user-facing change. Changeset markdown lives in `.changeset/`.
2. On merge to `main`, `.github/workflows/release.yml` runs `changesets/action`, which either opens/updates a "Version Packages" PR (bumping `packages/svelte-meta-tags/package.json` + CHANGELOG) or, when that PR is merged, runs `pnpm release` (`changeset publish`) to publish to npm with provenance.

Do **not** bump versions or edit `CHANGELOG.md` manually. `pnpm-workspace.yaml` sets a `minimumReleaseAge` for catalog dependency updates so Renovate waits before pulling new releases — preserve that field when editing the workspace file.

## Tooling notes

- **Prettier**: 120 col, single quotes, no trailing commas, `prettier-plugin-svelte` for `*.svelte`. Run `pnpm format` before committing — CI's `lint` job will fail otherwise.
- **ESLint**: flat config (`eslint.config.js`) with TS + Svelte. `svelte/no-at-html-tags` is intentionally disabled (required by `JsonLd.svelte`'s `{@html}` injection).
- **Svelte 5 only**: use runes (`$props`, `$state`, `$derived`, `$effect`) — do not introduce Svelte 4 reactive `$:` syntax. The supported Svelte range lives in `peerDependencies` of `packages/svelte-meta-tags/package.json`.
- **`schema-dts`** is a runtime dependency (used purely for types in `JsonLd`). Keep it in `dependencies`, not `devDependencies`.
