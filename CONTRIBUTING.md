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
4. Write / Update Tests. End to end tests are required for all changes and new features.
5. Open pull request

## Work with Svelte Meta Tags

All the code for the library is located in the `src/lib` directory.

The `src/routes` directory contains a fully working SvelteKit app. This will be used for end-to-end testing. You can run `pnpm dev` to run this app. You can also run it in a production build by running `pnpm build` and `pnpm preview`.

To run Cypress, you can run `pnpm build` and `pnpm preview` and `pnpm test`.
