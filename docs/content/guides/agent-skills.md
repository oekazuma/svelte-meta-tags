---
title: Agent Skills
sidebar:
  order: 1
---

svelte-meta-tags ships two [Agent Skills](https://github.com/vercel-labs/skills) — portable `SKILL.md` files that work with Claude Code, Cursor, Codex, and 70+ other agents, installed straight from this GitHub repository with no extra package to add.

## Setting it up for the first time

If your project doesn't have `svelte-meta-tags` wired up yet, install the setup skill. It detects whether you're in a SvelteKit project, whether nested layouts are in play, and scaffolds the `deepMerge` + `defineBaseMetaTags`/`definePageMetaTags` pattern accordingly.

```sh
npx skills add oekazuma/svelte-meta-tags --skill svelte-meta-tags-setup
```

## Improving code that already uses it

If `svelte-meta-tags` is already set up and you want an agent to catch common mistakes while writing or reviewing code (like importing `page` from the wrong module, or hand-rolling a merge instead of using `deepMerge`), install the companion skill instead.

```sh
npx skills add oekazuma/svelte-meta-tags --skill svelte-meta-tags-companion
```

You can install both by running the command once per skill, or list every skill in the repo with:

```sh
npx skills add oekazuma/svelte-meta-tags --list
```
