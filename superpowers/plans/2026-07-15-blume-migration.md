# Starlight → blume 移行 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `docs/` の Astro + Starlight 製ドキュメントサイトを blume v1.0.3 に置き換え、英語 + 日本語の2ロケールと GitHub Pages（`/svelte-meta-tags` サブパス）デプロイを維持する。

**Architecture:** blume はコンテンツフォルダ（`docs/content/`）をスキャンして静的サイトを生成する markdown-first フレームワーク。設定は `blume.config.ts` 1ファイル、サイドバーはファイル構造 + フォルダごとの `meta.ts` から自動生成。日本語は `content/ja/` ミラーで、未翻訳ページは英語に自動フォールバックする。

**Tech Stack:** blume ^1.0.3（Astro + Vite 内包）、pnpm workspace（catalog 方式）、GitHub Pages（`actions/upload-pages-artifact` + `actions/deploy-pages`）

**Spec:** `superpowers/specs/2026-07-15-blume-migration-design.md`

> **✅ ステータス（2026-07-19 時点）: upstream Issue #72 が解消され、blume 1.1.0（2026-07-19 公開）で再開。**
> [Issue #72](https://github.com/haydenbleasel/blume/issues/72) は closed 済み。`catalog.blume` を `^1.1.0` に更新し `pnpm install` → `pnpm --filter docs build` で **Task 2 Step 5 が成功**することを確認した（`docs/dist/` に `index.html` / `ja/index.html` などが生成され、`deployment.base: /svelte-meta-tags` も全リンクに正しく反映されている）。
>
> blume 1.1.0 は新たな推移依存 `takumi-js` / `@takumi-rs/*`（ネイティブバイナリ含む）を追加しており、これらも公開直後で `minimumReleaseAge: 4320` に一度ブロックされたため、`minimumReleaseAgeExclude` に `takumi-js` と `'@takumi-rs/*'` を追加している（`blume` 自体の exclude と同じ理由）。
>
> Task 1〜8 すべて完了（コンテンツ移行、Starlight 撤去、URL 突合、CI 更新、最終検証・プレビューフィードバック対応まで）。残るは Task 8 Step 4（仕上げ・PR 統合）のみ。

## Global Constraints

- blume は `^1.0.3`、Node 22.12+（リポジトリは 24.17.0 で充足。ルート `package.json` の `devEngines` / `packageManager` は変更しない）
- 依存バージョンは `pnpm-workspace.yaml` の `catalog:` に置き、`docs/package.json` からは `"catalog:"` で参照する（直接ピン禁止）
- `pnpm-workspace.yaml` の `minimumReleaseAge: 4320` は維持する
- GitHub Actions は必ず commit SHA ピン + `# vX.Y.Z` コメント（bare タグ禁止）
- Prettier: 120桁・シングルクォート・trailing comma なし。各タスクのコミット前に `pnpm format` 相当が通ること
- changeset は**不要**（docs サイトのみの内部変更）
- 作業ブランチ: `docs/migrate-to-blume`（作成済み）
- サンドボックスで `pnpm install` がブロックされた場合は、ユーザーに `! pnpm install` の実行を依頼する（勝手な回避策をとらない）

## 新旧対応の全体マップ

| 現在（Starlight）                          | 移行後（blume）                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `docs/astro.config.mjs`                    | `docs/blume.config.ts`                                                         |
| `docs/src/content/docs/**`                 | `docs/content/**`                                                              |
| `docs/src/content/docs/ja/**`              | `docs/content/ja/**`                                                           |
| `docs/src/assets/*.svg`                    | `docs/public/*.svg`                                                            |
| `docs/src/styles/custom.css`               | 廃止（Task 8 の目視確認で表が崩れる場合のみ `docs/theme.css` を追加）          |
| `docs/src/content.config.ts`               | 廃止（blume が内部処理）                                                       |
| `docs/tsconfig.json`                       | blume 推奨内容に更新（`blume check` が authored ファイルを検査するために必要） |
| astro.config の `sidebar` + `translations` | フォルダ `meta.ts` / `meta.$.ts` + ページ frontmatter `sidebar.order`          |
| `withastro/action`                         | `pnpm --filter docs build` + Pages 公式アクション                              |

サイドバーの最終形（en。ja は同構造で `meta.ts` のラベルが翻訳される）:

```text
(index)               ← content/index.mdx
Installing            ← ページ, sidebar.order: 1
Usage                 ← ページ, sidebar.order: 2
Deep Merge function   ← ページ, sidebar.order: 3
Migration Guide       ← ページ, sidebar.order: 4
MetaTags Properties   ← グループ, meta.ts order: 1
Open Graph            ← グループ, meta.$.ts order: 2
JSON-LD               ← グループ, meta.$.ts order: 3
Types                 ← グループ, meta.ts order: 4
```

※ blume の flat 表示ではグループ外ページが常にグループ群の上に表示される（スペック承認済みの並び）。

---

### Task 1: 依存関係を blume に切り替える

**Files:**

- Modify: `pnpm-workspace.yaml`
- Modify: `docs/package.json`
- Modify: `.gitignore`

**Interfaces:**

- Produces: `pnpm --filter docs exec blume <cmd>` が動く状態（以降の全タスクが依存）

- [x] **Step 1: `pnpm-workspace.yaml` の catalog を更新**

`catalog:` から `'@astrojs/check'`、`'@astrojs/starlight'`、`astro`、`sharp` の4行を削除し（docs 専用依存。他ワークスペースでの未使用は確認済み）、`blume` をアルファベット順の位置（`astro` があった行の位置）に追加する。`allowBuilds:` から `sharp: true` を削除する（`esbuild: true` は残す）。

また、blume 1.0.3 は公開から3日未満で `minimumReleaseAge: 4320` に弾かれるため、`minimumReleaseAgeExclude` に `blume` を追加する（ユーザー承認済み。`minimumReleaseAge` 自体は維持）。

変更後の該当ブロック:

```yaml
minimumReleaseAge: 4320

minimumReleaseAgeExclude:
  - blume

allowBuilds:
  esbuild: true

catalog:
  '@changesets/cli': ^2.31.0
  '@eslint/compat': ^2.1.0
  '@eslint/js': ^10.0.1
  '@playwright/test': ^1.61.1
  '@sveltejs/adapter-auto': ^7.0.1
  '@sveltejs/kit': ^2.69.2
  '@sveltejs/package': ^2.5.8
  '@sveltejs/vite-plugin-svelte': ^7.2.0
  '@types/eslint': ^9.6.1
  blume: ^1.0.3
  eslint: ^10.7.0
```

（`eslint` 以降の既存行は変更しない。`minimumReleaseAge: 4320` と `packages:` はそのまま）

- [x] **Step 2: `docs/package.json` を書き換え**

全文をこの内容にする:

```json
{
  "name": "docs",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "blume dev",
    "start": "blume dev",
    "check": "blume check",
    "build": "blume build",
    "preview": "blume preview"
  },
  "dependencies": {
    "blume": "catalog:",
    "typescript": "catalog:"
  }
}
```

（`typescript` は `blume check`（内部で `astro check`）のために残す。`astro` スクリプトエントリは削除）

- [x] **Step 3: ルート `.gitignore` に `.blume/` を追加**

`.astro/` の行の直後に追加:

```text
.astro/
.blume/
```

（`dist` は既存の行がカバーしている）

- [x] **Step 4: インストール**

Run: `pnpm install`
Expected: エラーなく完了。`docs/node_modules/.bin/blume` が存在する。

- [x] **Step 5: blume が動くことを確認**

Run: `pnpm --filter docs exec blume --version`
Expected: `1.0.3`（またはそれ以降の 1.0.x）

- [x] **Step 6: コミット**

```bash
git add pnpm-workspace.yaml docs/package.json .gitignore pnpm-lock.yaml
git commit -m "docs: replace starlight deps with blume"
```

---

### Task 2: blume.config.ts とアセットを作成し初回ビルドを通す

**Files:**

- Create: `docs/blume.config.ts`
- Create: `docs/content/index.mdx`
- Move: `docs/src/assets/light-logo.svg` → `docs/public/light-logo.svg`
- Move: `docs/src/assets/dark-logo.svg` → `docs/public/dark-logo.svg`
- Modify: `docs/tsconfig.json`

**Interfaces:**

- Produces: `pnpm --filter docs build` が成功する blume プロジェクトの骨格。`content/` 直下が以降のタスクのコンテンツ配置先。

- [x] **Step 1: ロゴを public/ へ移動**

```bash
git mv docs/src/assets/light-logo.svg docs/public/light-logo.svg
git mv docs/src/assets/dark-logo.svg docs/public/dark-logo.svg
```

（`docs/public/favicon.svg` は既存のまま。blume は `public/` の favicon ファイルを自動検出するため設定不要）

- [x] **Step 2: `docs/blume.config.ts` を作成**

```ts
import { defineConfig } from 'blume';

export default defineConfig({
  title: 'SvelteMetaTags',
  description: 'Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.',
  content: { root: 'content' },
  logo: {
    image: { light: '/light-logo.svg', dark: '/dark-logo.svg', alt: 'SvelteMetaTags' },
    text: ''
  },
  github: { owner: 'oekazuma', repo: 'svelte-meta-tags', dir: 'docs' },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', label: 'English' },
      { code: 'ja', label: '日本語' }
    ]
  },
  deployment: {
    site: 'https://oekazuma.github.io',
    base: '/svelte-meta-tags'
  }
});
```

（`content.root` のデフォルトは `docs` のため明示必須。`logo.text: ''` は現行 Starlight の `replacesTitle: true` 相当＝ロゴ画像単独表示。`redirects` は Task 6 で必要になった場合のみ追加）

- [x] **Step 3: トップページ `docs/content/index.mdx` を作成**

現行 `docs/src/content/docs/index.mdx`（splash + hero）の置き換え。blume には splash テンプレートがないため通常ページ化する（スペック承認済み）:

```mdx
---
title: Svelte Meta Tags
description: Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.
seo:
  title: Svelte Meta Tags ・ Components to manage SEO
  description: Svelte Meta Tags is a Svelte library to manage SEO meta tags in your Svelte applications. It provides a set of components to manage the meta tags in your Svelte applications.
---

<CardGroup cols={2}>
  <Card title="Effortless SEO Management" icon="rocket">
    Easily manage SEO meta tags with a simple interface for more effective search engine optimization.
  </Card>
  <Card title="JSON-LD Support" icon="file-text">
    Offers JSON-LD support for structured data, which is essential for search engine optimization.
  </Card>
  <Card title="Deep Merge Functionality" icon="puzzle">
    The deep merge function allows you to easily manage meta tags in complex Svelte applications.
  </Card>
  <Card title="TypeScript Friendly" icon="code">
    Includes TypeScript support to help you manage meta tags in a type-safe way.
  </Card>
</CardGroup>

<CardGroup cols={2}>
  <Card title="Get started" icon="arrow-right" href="/installing">
    Install Svelte Meta Tags and set up your first meta tags.
  </Card>
  <Card title="View on GitHub" icon="github" href="https://github.com/oekazuma/svelte-meta-tags">
    Browse the source, open issues, and contribute.
  </Card>
</CardGroup>
```

注意: blume のアイコンは Lucide 名（kebab-case）。Starlight の `document` → `file-text`、`seti:typescript` → `code` に置換している。`Card`/`CardGroup` は組み込みで import 不要。内部リンクは `/installing` のように base 抜きで書く（blume が `deployment.base` を付けて書き換える）。

- [x] **Step 4: tsconfig を blume 推奨内容に更新**

`docs/tsconfig.json` を全文この内容にする（blume CLI リファレンス記載の推奨構成。プロジェクトルートの tsconfig がないと `blume check` は生成ランタイムしか検査しない）:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".blume/.astro/types.d.ts", ".blume/src/env.d.ts", "**/*"]
}
```

- [x] **Step 5: ビルド確認 — 2026-07-19 時点で成功（blume 1.1.0、Issue #72 解消後）**

Run: `pnpm --filter docs build`
Expected: `[build] Complete!` とビルドサマリー（`Output static` / `Search orama` / `Sitemap yes`）が出て `docs/dist/` が生成される。旧 `docs/src/content/docs/**` はまだ残っているが、blume は `content/` しか見ないため干渉しない。

実際の結果（1.1.0）: 成功。`Sitemap yes` / `Robots yes` / `LLM files yes` / `Search orama` を確認、`index.html` / `ja/index.html` のリンクに `deployment.base` (`/svelte-meta-tags`) が正しく反映されていることも確認済み。

- [x] **Step 6: コミット**

```bash
git add pnpm-workspace.yaml pnpm-lock.yaml
git commit -m "docs: bump blume to 1.1.0 (fixes upstream isolated-linker bug)"
```

（Step 1〜4 の内容は本セッションでは既に `docs: scaffold blume config, top page, and assets (build blocked)` としてコミット済みのため、追加の差分なし）

---

### Task 3: 英語コンテンツを移行する（完了）

**Files:**

- Move+Modify: `docs/src/content/docs/**`（`ja/` 以外の全ファイル）→ `docs/content/**`
- Create: `docs/content/meta-tags-properties/meta.ts`、`docs/content/open-graph/meta.$.ts`、`docs/content/json-ld/meta.$.ts`、`docs/content/json-ld/json-ld-properties/meta.$.ts`、`docs/content/types/meta.ts`、`docs/content/types/additional-types/meta.$.ts`

**Interfaces:**

- Consumes: Task 2 の `docs/content/` と `blume.config.ts`
- Produces: 英語全ページのルート（`/installing`、`/meta-tags-properties/...` 等）。Task 4 の `ja/` ミラーはこの構造に対応させる。

- [x] **Step 1: ディレクトリごと移動するグループをまとめて git mv**

```bash
git mv docs/src/content/docs/meta-tags-properties docs/content/meta-tags-properties
git mv docs/src/content/docs/open-graph docs/content/open-graph
git mv docs/src/content/docs/json-ld docs/content/json-ld
git mv docs/src/content/docs/types docs/content/types
```

（各ページの frontmatter `title` / `description` / `sidebar.order` は blume 互換なので中身は無変更。例外は Step 4 の `json-ld-multiple-examples.mdx` のみ）

- [x] **Step 2: フラット化する4ページを移動**

```bash
git mv docs/src/content/docs/installing/index.mdx docs/content/installing.mdx
git mv docs/src/content/docs/usage/index.mdx docs/content/usage.mdx
git mv docs/src/content/docs/deep-merge-function/index.md docs/content/deep-merge-function.md
git mv docs/src/content/docs/migration-guide/index.md docs/content/migration-guide.md
```

旧 `docs/src/content/docs/index.mdx` は Task 2 で新規作成済みのため削除:

```bash
git rm docs/src/content/docs/index.mdx
```

- [x] **Step 3: フラット化4ページの frontmatter に並び順を追加し、コンポーネントを変換**

`docs/content/installing.mdx` — 全文をこの内容にする（Starlight `Tabs/TabItem` → blume `CodeGroup`。タブラベルは各コードブロックの言語名の後のテキスト）:

````mdx
---
title: Installing
sidebar:
  order: 1
---

<CodeGroup>

```sh npm
npm install -D svelte-meta-tags
```

```sh pnpm
pnpm add -D svelte-meta-tags
```

```sh Yarn
yarn add -D svelte-meta-tags
```

</CodeGroup>
````

`docs/content/usage.mdx` — frontmatter を以下に変更し、`import { LinkButton } ...` 行と `<LinkButton ...>Demo</LinkButton>` ブロックを Markdown リンクに置換する。それ以降の本文（コード例）は無変更:

```mdx
---
title: Usage
sidebar:
  order: 2
---

[Demo ↗](https://svelte.dev/repl/ffd783c9b8e54d97b6b7cac6eadace42)
```

`docs/content/deep-merge-function.md` — frontmatter に追加（本文無変更）:

```yaml
sidebar:
  order: 3
```

`docs/content/migration-guide.md` — frontmatter に追加（本文無変更）:

```yaml
sidebar:
  order: 4
```

- [x] **Step 4: `json-ld-multiple-examples.mdx` の Aside を変換**

`docs/content/json-ld/json-ld-properties/json-ld-multiple-examples.mdx` の `import { Aside } from '@astrojs/starlight/components';` 行を削除し、

```mdx
<Aside type="caution">
  Safari will log an error to the console when you use an array to describe multiple data items. Although the library
  functions correctly, be cautious if you're aggregating error logs with tools like Sentry. To avoid this issue,
  consider using @graph.
</Aside>
```

を次に置換する:

```mdx
:::caution
Safari will log an error to the console when you use an array to describe multiple data items. Although the library
functions correctly, be cautious if you're aggregating error logs with tools like Sentry. To avoid this issue,
consider using @graph.
:::
```

- [x] **Step 5: グループの meta ファイルを作成**

`$` 付きファイル（`meta.$.ts`）は全ロケール共有（en/ja でラベルが同じグループ用）。`meta.ts` はロケール別（Task 4 で ja 側に翻訳版を作るグループ用）。

`docs/content/meta-tags-properties/meta.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'MetaTags Properties',
  order: 1
});
```

`docs/content/open-graph/meta.$.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'Open Graph',
  order: 2
});
```

`docs/content/json-ld/meta.$.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'JSON-LD',
  order: 3
});
```

（フォルダ名の humanize では "Json Ld" になってしまうため title 指定が必須）

`docs/content/json-ld/json-ld-properties/meta.$.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'JSON-LD Properties'
});
```

`docs/content/types/meta.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'Types',
  order: 4
});
```

`docs/content/types/additional-types/meta.$.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'Additional types'
});
```

- [x] **Step 6: ビルドとリンク検証**

Run: `pnpm --filter docs build`
Expected: 成功。ページ数が en 全ページ分（40ページ前後）に増える。

Run: `pnpm --filter docs exec blume validate`
Expected: リンク切れ 0 件。`/svelte-meta-tags/...` のような base 込みで書かれた内部リンクがあれば警告されるので、base 抜き（`/installing` 形式）に修正する。

- [x] **Step 7: コミット**

```bash
git add docs/content docs/src
git commit -m "docs: migrate English content to blume conventions"
```

---

### Task 4: 日本語コンテンツを移行する（完了）

**Files:**

- Move+Modify: `docs/src/content/docs/ja/**` → `docs/content/ja/**`
- Create: `docs/content/ja/meta-tags-properties/meta.ts`、`docs/content/ja/types/meta.ts`

**Interfaces:**

- Consumes: Task 3 の en 構造（ja はそのミラー）。共有 `meta.$.ts`（Open Graph / JSON-LD / JSON-LD Properties / Additional types）は ja にも自動適用される。
- Produces: `/ja/...` 全ルートと日本語サイドバー。

- [x] **Step 1: ディレクトリごと移動**

```bash
git mv docs/src/content/docs/ja/meta-tags-properties docs/content/ja/meta-tags-properties
git mv docs/src/content/docs/ja/open-graph docs/content/ja/open-graph
git mv docs/src/content/docs/ja/json-ld docs/content/ja/json-ld
git mv docs/src/content/docs/ja/types docs/content/ja/types
```

- [x] **Step 2: フラット化する4ページを移動**

```bash
git mv docs/src/content/docs/ja/installing/index.mdx docs/content/ja/installing.mdx
git mv docs/src/content/docs/ja/usage/index.mdx docs/content/ja/usage.mdx
git mv docs/src/content/docs/ja/deep-merge-function/index.md docs/content/ja/deep-merge-function.md
git mv docs/src/content/docs/ja/migration-guide/index.md docs/content/ja/migration-guide.md
```

- [x] **Step 3: ja トップページを作成**

`docs/src/content/docs/ja/index.mdx` を `docs/content/ja/index.mdx` に置き換える。en 版（Task 2 Step 3）と同じ構造で、テキストは既存 ja 版から引き継ぐ。全文:

```mdx
---
title: Svelte Meta Tags
description: Svelte Meta Tagsは、SvelteプロジェクトのSEOを管理するために設計されたコンポーネントを提供します。
seo:
  title: Svelte Meta Tags ・ SEOを管理するためのコンポーネント
  description: Svelte Meta Tagsは、SvelteアプリケーションのSEOメタタグを管理するためのSvelteライブラリです。Svelteアプリケーションのメタタグを管理するためのコンポーネント群を提供します。
---

<CardGroup cols={2}>
  <Card title="効率的なSEO管理" icon="rocket">
    シンプルなインターフェイスでSEOメタタグを簡単に管理し、より効果的な検索エンジン最適化を実現します。
  </Card>
  <Card title="JSON-LDのサポート" icon="file-text">
    検索エンジン最適化に不可欠な構造化データのJSON-LDサポートを提供します。
  </Card>
  <Card title="ディープマージ機能" icon="puzzle">
    ディープマージ機能により、複雑なSvelteアプリケーションのmetaタグを簡単に管理できます。
  </Card>
  <Card title="TypeScript フレンドリー" icon="code">
    TypeScriptをサポートしており、タイプセーフな方法でメタタグを管理できます。
  </Card>
</CardGroup>

<CardGroup cols={2}>
  <Card title="はじめる" icon="arrow-right" href="/ja/installing">
    Svelte Meta Tags をインストールして最初のメタタグを設定します。
  </Card>
  <Card title="GitHubを見る" icon="github" href="https://github.com/oekazuma/svelte-meta-tags">
    ソースの閲覧、Issue の起票、コントリビュートはこちら。
  </Card>
</CardGroup>
```

旧ファイルを削除:

```bash
git rm docs/src/content/docs/ja/index.mdx
```

- [x] **Step 4: ja のフラット化4ページとコンポーネントを en と同一ルールで変換**

`docs/content/ja/installing.mdx` — frontmatter を `title: インストール` のまま `sidebar.order: 1` を追加し、本文の `Tabs/TabItem`（import 行含む）を en 版（Task 3 Step 3）と同じ `CodeGroup` ブロックに置換する（コマンド内容は同一）。

`docs/content/ja/usage.mdx` — `sidebar.order: 2` を追加。`import { LinkButton } ...` 行と `<LinkButton ...>` ブロックを `[Demo ↗](https://svelte.dev/repl/ffd783c9b8e54d97b6b7cac6eadace42)` に置換。本文のコード例は無変更。

`docs/content/ja/deep-merge-function.md` — `sidebar.order: 3` を追加（本文無変更）。

`docs/content/ja/migration-guide.md` — `sidebar.order: 4` を追加（本文無変更）。

`docs/content/ja/json-ld/json-ld-properties/json-ld-multiple-examples.mdx` — `import { Aside } ...` 行を削除し、`<Aside type="caution">...</Aside>` を `:::caution` / `:::` 記法に置換（中の日本語テキストはそのまま）。

- [x] **Step 5: ja のロケール別 meta.ts を作成**

`docs/content/ja/meta-tags-properties/meta.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'MetaTagsプロパティ',
  order: 1
});
```

`docs/content/ja/types/meta.ts`:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: '型定義',
  order: 4
});
```

（Open Graph / JSON-LD / JSON-LD Properties / Additional types は en 側の `meta.$.ts` が全ロケールに適用されるため ja 側は不要）

- [x] **Step 6: 残骸ディレクトリの確認**

Run: `find docs/src -type f`
Expected: `docs/src/content.config.ts` と `docs/src/styles/custom.css` のみが残る（Task 5 で撤去）。他のファイルが残っていれば移行漏れなので Step 1〜4 を見直す。

- [x] **Step 7: ビルドとリンク検証**

Run: `pnpm --filter docs build`
Expected: 成功。ページ数が en + ja 全ページ分（80ページ前後）になる。

Run: `pnpm --filter docs exec blume validate`
Expected: リンク切れ 0 件。

- [x] **Step 8: コミット**

```bash
git add docs/content docs/src
git commit -m "docs: migrate Japanese content to blume conventions"
```

---

### Task 5: Starlight の残骸を撤去する（完了）

**Files:**

- Delete: `docs/astro.config.mjs`、`docs/src/`（`content.config.ts`、`styles/custom.css`）、`docs/README.md`（空ファイル）

**Interfaces:**

- Consumes: Task 3・4 でコンテンツ移動が完了していること
- Produces: blume のみで完結した `docs/` ワークスペース

- [x] **Step 1: 撤去**

```bash
git rm docs/astro.config.mjs
git rm -r docs/src
git rm docs/README.md
```

注意: `docs/src/styles/custom.css` の中身は `th, td { min-width: 100px; }` のみ。blume のデフォルトテーブルスタイルで問題ないか Task 8 の目視確認で判断し、崩れる場合のみそこで `docs/theme.css` を追加する（このタスクでは持ち込まない）。

- [x] **Step 2: フル検証**

Run: `pnpm --filter docs build && pnpm --filter docs check`
Expected: 両方成功。

Run: `pnpm --filter docs exec blume doctor`
Expected: 設定・コンテンツの診断エラー 0 件。

- [x] **Step 3: フォーマットと lint**

Run: `pnpm format && pnpm lint`
Expected: `pnpm lint` が成功（prettier が新規 `.ts` / `.mdx` を整形済みであること）。

- [x] **Step 4: コミット**

```bash
git add -A docs
git commit -m "docs: remove starlight scaffolding"
```

---

### Task 6: 新旧 URL を突合し redirects を確定する（完了）

**Files:**

- Modify: `docs/blume.config.ts`（差分があった場合のみ）

**Interfaces:**

- Consumes: Task 5 までの完成した `docs/dist/`
- Produces: 旧 URL がすべて生きていることの保証（`redirects` 配列 or 差分ゼロの確認記録）

**結果（2026-07-19）:** sitemap 突合で1件の差分を検出 — `dataSet.md`（キャメルケースのファイル名）は旧 Starlight ではスラグが小文字化され `/json-ld/json-ld-properties/dataset` として公開されていたが、blume はファイル名の大文字小文字をそのまま URL に使うため `dataSet` になり不一致だった。`dataSet.md` → `dataset.md`（en/ja 両方）にリネームして解決。redirects は不要、差分ゼロを確認済み。

- [x] **Step 1: 本番サイトの URL 一覧を取得**

Run:

```bash
mkdir -p /tmp/claude
curl -s https://oekazuma.github.io/svelte-meta-tags/sitemap-0.xml | grep -o '<loc>[^<]*</loc>' | sed -e 's/<\/\?loc>//g' -e 's|https://oekazuma.github.io/svelte-meta-tags||' -e 's|/$||' -e 's|^$|/|' | sort > /tmp/claude/old-urls.txt
```

（末尾の `s|^$|/|` はサイトルートを `/` に正規化する。新 URL 側と表現を揃えないと突合で偽差分が出る）

（`sitemap-0.xml` が 404 の場合は `sitemap-index.xml` を見て実ファイル名を確認する）

- [x] **Step 2: 新ビルドの URL 一覧を生成**

Run:

```bash
cd docs/dist && find . -name 'index.html' | sed -e 's|^\.||' -e 's|/index.html$||' -e 's|^/svelte-meta-tags||' -e 's|^$|/|' | sort > /tmp/claude/new-urls.txt && cd -
```

（base の除去（`s|^/svelte-meta-tags||`）を先に行ってから空文字列を `/` に正規化する順序が重要。`deployment.base` 設定により dist 直下が `svelte-meta-tags/` 配下になっている場合もこの sed が吸収する。構造が違ったら実際の dist を見て調整する）

- [x] **Step 3: 突合**

Run: `comm -23 /tmp/claude/old-urls.txt /tmp/claude/new-urls.txt`
Expected: **空**（旧 URL がすべて新ビルドに存在する）。

出力がある場合、それが「旧にあって新にない」URL。各行について `docs/blume.config.ts` に redirect を追加する:

```ts
redirects: [{ from: '/old-path', to: '/new-path' }];
```

追加後 `pnpm --filter docs build` を再実行し、Step 2〜3 を繰り返して空になることを確認する。ビルドサマリーの `Redirects` 行の件数が追加分と一致すること。

- [x] **Step 4: コミット（redirects を追加した場合のみ）**

```bash
git add docs/blume.config.ts
git commit -m "docs: add redirects for moved pages"
```

---

### Task 7: GitHub Pages デプロイワークフローを更新する（完了）

**Files:**

- Modify: `.github/workflows/deploy-docs.yml`

**Interfaces:**

- Consumes: Task 1 の `docs` build スクリプト（`blume build`）、既存 composite action `.github/workflows/setup-node/`（Node/pnpm をルート `package.json` から解決）
- Produces: main マージ時に blume ビルドを GitHub Pages へ公開するワークフロー

- [x] **Step 1: `deploy-docs.yml` を書き換え**

全文をこの内容にする（`deploy` ジョブは現行のまま）:

```yaml
name: Deploy for Docs to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0
      - name: Setup Node.js and dependencies
        uses: ./.github/workflows/setup-node
      - name: Build docs
        run: pnpm --filter docs build
      - name: Configure GitHub Pages
        uses: actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b # v5.0.0
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@7b1f4a764d45c48632c6b24a0339c27f5614fb0b # v4.0.0
        with:
          path: docs/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@cd2ce8fcbc39b97be8ca5fce6e763baed58fa128 # v5.0.0
```

（Node/pnpm バージョン取得ステップは composite action `setup-node` が担うため削除。SHA は検証済み: configure-pages v5.0.0 = `983d773…`、upload-pages-artifact v4.0.0 = `7b1f4a7…`。既存の checkout / deploy-pages の SHA は現行ファイルのまま）

- [x] **Step 2: lint 確認**

Run: `pnpm lint`
Expected: 成功（prettier が YAML も検査するため）。

- [x] **Step 3: コミット**

```bash
git add .github/workflows/deploy-docs.yml
git commit -m "ci: build docs with blume for GitHub Pages"
```

---

### Task 8: 最終検証（プレビュー目視）（完了）

**Files:**

- Create: `docs/theme.css`（表の崩れではなくロゴサイズ調整のため）

**Interfaces:**

- Consumes: 全タスクの成果物

**結果（2026-07-19）:** Step1 のフルチェーンは全項目成功（`pnpm install && pnpm lint && pnpm --filter docs check && pnpm --filter docs build && pnpm --filter docs exec blume validate && pnpm --filter docs exec blume doctor`）。プレビュー目視確認をユーザーに依頼し、2点のフィードバックを受けて対応済み:

1. ヘッダーロゴが小さい（blume 既定の `h-5` = 20px）→ `docs/theme.css` で `img[alt='SvelteMetaTags'] { height: 2rem !important; }` を追加し 32px に拡大。カスタム `Logo` layout スロットコンポーネントを自作する方式も試したが、`moduleResolution: Bundler` 下で `blume/components/islands/base-path` 等の拡張子付き import が `blume check` で解決できず断念（`docs/tsconfig.json` の `.blume/src/env.d.ts` と同種の制限）。CSS 上書きなら型チェックの問題を完全に回避できるためこちらを採用。
2. Deep Merge function の "New" サイドバーバッジが陳腐化 → en/ja 両方の frontmatter から `sidebar.badge` を削除。

表の崩れは報告されなかったため、Starlight 由来の `min-width` ルールは移植不要と判断。

- [x] **Step 1: フルチェーンを一括実行**
- [x] **Step 2: プレビューを起動しユーザーに目視確認を依頼**
- [x] **Step 3: フィードバック対応（ロゴサイズ・陳腐化バッジ）** — 上記の通り実施
- [ ] **Step 4: 仕上げ**

superpowers:finishing-a-development-branch スキルに従い、PR 作成などの統合方法をユーザーに確認する。PR 本文には移行内容の要約と、デプロイは main マージ後に `deploy-docs.yml` が走ることを記載する。
