---
title: Agent Skills
sidebar:
  order: 1
---

svelte-meta-tags は2つの [Agent Skills](https://github.com/vercel-labs/skills) を提供しています。`SKILL.md` という移植可能な形式のファイルで、Claude Code、Cursor、Codex をはじめとする70以上のエージェントで動作し、追加のパッケージなしに、この GitHub リポジトリから直接インストールできます。

## はじめて導入する場合

プロジェクトに `svelte-meta-tags` をまだ導入していない場合は、セットアップ用スキルをインストールしてください。SvelteKit プロジェクトかどうか、ネストレイアウトがあるかどうかを検出し、それに応じて `deepMerge` + `defineBaseMetaTags`/`definePageMetaTags` のパターンを組み立てます。

```sh
npx skills add oekazuma/svelte-meta-tags --skill svelte-meta-tags-setup
```

## 導入済みのコードを改善したい場合

すでに `svelte-meta-tags` を導入済みで、コードを書く・レビューする際にエージェントによくある間違い（誤ったモジュールから `page` を import してしまう、`deepMerge` を使わず自前でマージしてしまう、など）を指摘してもらいたい場合は、伴走用スキルをインストールしてください。

```sh
npx skills add oekazuma/svelte-meta-tags --skill svelte-meta-tags-companion
```

両方をインストールするには、上記コマンドをスキルごとに1回ずつ実行してください。リポジトリ内のスキル一覧を確認するには次のコマンドを使います:

```sh
npx skills add oekazuma/svelte-meta-tags --list
```
