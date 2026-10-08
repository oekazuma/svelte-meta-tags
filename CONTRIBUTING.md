# Svelte Meta Tags Contributing Guide

Hi! We are really excited that you are interested in contributing to Svelte Meta Tags. Before submitting your contribution, please make sure to take a moment and read through the following guide:

## Project Set Up

It requires the [Vite+](https://viteplus.dev/) `vp` CLI. It reads the Node.js and pnpm versions from `package.json` and runs pnpm for you, so you don't need to install pnpm yourself. You can [install Vite+](https://viteplus.dev/guide/) with:

```bash
curl -fsSL https://vite.plus | bash
```

The installer adds `vp` to your shell profile, so open a new terminal (or run `. "$HOME/.config/vite-plus/env"`) before continuing.

1. Pull the repo and install the dependencies:

```
git clone git@github.com:oekazuma/svelte-meta-tags.git
vp install
```

2. Make your modifications / additions
3. Update / Add Documentation
4. Write / Update Tests. End to end tests are required for all changes and new features.
5. Run the same checks CI runs before opening a pull request:

```bash
vp run lint    # Oxfmt + Oxlint (via Vite+) + ESLint for Svelte templates
vp run check   # svelte-kit sync && svelte-check
vp run test    # Vitest + Playwright
```

Run `vp run format` to auto-fix formatting issues found by `vp run lint`.

6. Open pull request

## Work with Svelte Meta Tags

All the code for the library is located in the `packages/svelte-meta-tags/src/lib` directory.

The `tests/svelte-5/src/routes` directory contains a fully working SvelteKit app. This will be used for end-to-end testing. You can run `vp run dev` to run this app. You can also run it in a production build by running `vp run build` and `vp run preview`.

To run Playwright, you can run `vp run test`.

## Releases

The [Changesets GitHub action](https://github.com/changesets/action#with-publishing) will create and update a PR that applies changesets and publishes new versions of changed packages to npm.
