# docs/ を Starlight から blume へ移行する設計

日付: 2026-07-15
ステータス: 承認済み（ブレインストーミングセッションにて）

## 目的

`docs/` の Astro + Starlight 製ドキュメントサイトを [blume](https://github.com/haydenbleasel/blume)（v1.0.3、Astro ベースの markdown-first ドキュメントプラットフォーム）に置き換える。英語 + 日本語の2ロケール構成と GitHub Pages（`/svelte-meta-tags` サブパス）へのデプロイを維持する。

## 決定事項

- **アプローチ**: `docs/` ワークスペース内で丸ごと置き換え（1 PR で切り替え）。並行構築や eject 前提の構成は採らない。
- **URL 構造**: blume の規約に合わせて再構成してよい。変更が生じた URL は `blume.config.ts` の `redirects` で旧 URL からリダイレクトする（静的ビルドではリダイレクトページとして出力される）。
- **トップページ**: Starlight の splash テンプレート + hero は廃止し、通常のドキュメントページ（概要 + 主要セクションへの `Card` リンク）に簡素化する。
- **changeset**: 不要（docs サイトのみの内部変更のため）。

## コンテンツ構成

`docs/src/content/docs/` → `docs/content/` へ移動し、以下の構成にする。単独ページしか持たない現在のグループ（Installing / Usage / Deep Merge function / Migration Guide）はトップレベルページにフラット化する。

```
docs/
  blume.config.ts
  package.json
  content/
    meta.ts                    (ルートの並び順: installing → usage → meta-tags-properties → open-graph → json-ld → deep-merge-function → types → migration-guide)
    index.mdx                  → /
    installing.mdx             → /installing
    usage.mdx                  → /usage
    meta-tags-properties/      → /meta-tags-properties/…   (index + 7ページ + meta.ts)
    open-graph/                → /open-graph/…             (index + 5ページ + meta.ts)
    json-ld/                   → /json-ld/…
      json-ld-properties/      (index + 7ページ + meta.ts)
    deep-merge-function.md     → /deep-merge-function
    types/                     → /types/…                  (index なし・10ページ + meta.ts)
      additional-types/        (index + 12ページ + meta.ts)
    migration-guide.md         → /migration-guide
    ja/                        (上記の完全ミラー + ロケール別 meta.ts)
  public/
    favicon.svg
    light-logo.svg
    dark-logo.svg
```

- サイドバーはファイルシステムから自動生成する。グループのラベル・順序はフォルダごとの `meta.ts`（`defineMeta`）で指定する。
- 日本語のグループラベル（インストール、使い方、MetaTags プロパティ、型定義、移行ガイド等 — 現在 `astro.config.mjs` の `translations` にあるもの）は `ja/` 側の同位置の `meta.ts` に移す。
- 日本語 URL は現行どおり `/ja/…` プレフィックス。未翻訳ページは en に自動フォールバックし、言語スイッチャーと `hreflang` は blume が自動生成する。
- 既存の en/ja ミラー対応関係（どの en ページに ja 訳があるか）を移行で崩さない。

## blume.config.ts

```ts
import { defineConfig } from 'blume';

export default defineConfig({
  title: 'SvelteMetaTags',
  description: 'Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.',
  logo: {
    image: { light: '/light-logo.svg', dark: '/dark-logo.svg', alt: 'SvelteMetaTags' },
    text: '' // 現行の replacesTitle: true 相当（ロゴ単独表示）
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
  },
  redirects: [
    /* 移行で URL が変わったページ分をここに列挙する（実装時に新旧対応表を作って確定） */
  ]
});
```

- 検索はデフォルトの Orama ローカル検索を使う（設定不要、ロケール対応）。
- `llms.txt` / `llms-full.txt` / sitemap は blume が自動生成する。
- Ask AI 等のサーバー機能は使わない（GitHub Pages は静的ホスティングのため）。

## コンテンツ変換ルール

全 Markdown/MDX（en 約40 + ja 約40ファイル）に以下を機械的に適用する。en/ja とも同一ルール。

| Starlight | blume |
| --- | --- |
| frontmatter `title` / `description` / `sidebar.order` | そのまま互換（変換不要） |
| `head:` / `template: splash` / `hero:` / `editUrl` / `lastUpdated`（index.mdx のみ使用） | 削除。トップは通常ページ化し `Card` / `CardGroup` で主要セクションへ誘導 |
| `import { Tabs, TabItem } from '@astrojs/starlight/components'` | import 削除。パッケージマネージャ切り替えは `CodeGroup` に置換 |
| `Card` / `CardGrid` | 組み込みの `Card` / `CardGroup`（import 不要） |
| `Aside` | `:::note` / `:::tip` / `:::caution` 記法 |
| `LinkButton` | `Card` またはリンク付き段落 |

撤去するファイル: `astro.config.mjs`、`src/content.config.ts`、`src/styles/custom.css`、`src/assets/`（ロゴ SVG は `public/` へ移動）。`tsconfig.json` は blume の推奨内容に合わせて更新する。

`custom.css` の内容は移行時に精査し、ブランドカラー等の必要なものだけ blume の `theme.css`（Tailwind v4 テーマトークン）へ移植する。不要であれば持ち込まない。

## パッケージと CI

### docs/package.json

- `dependencies`: `blume` のみ（`catalog:` 参照）。`pnpm-workspace.yaml` の catalog に `blume` を追加し、docs 専用だった `@astrojs/starlight` / `astro` / `@astrojs/check` / `sharp` を catalog から削除する（他ワークスペースで未使用であることを実装時に確認）。`minimumReleaseAge` フィールドは維持する。
- `scripts`: `dev: blume dev` / `build: blume build` / `preview: blume preview`。`check`（現 `astro check`）は blume に相当コマンドがないため削除する。ルートの `pnpm check` は `-r` 実行なので docs が抜けても他ワークスペースに影響しない。

### .github/workflows/deploy-docs.yml

- `withastro/action` を撤去し、以下の構成に置き換える: checkout → 既存 composite action `.github/workflows/setup-node/` → `pnpm install` → `pnpm --filter docs build` → `actions/configure-pages` → `actions/upload-pages-artifact`（path: `docs/dist`）→ `actions/deploy-pages`。
- すべてのアクションは SHA ピン留め + `# vX.Y.Z` コメントのスタイルを維持する。
- Node / pnpm のバージョンは従来どおりルート `package.json` から解決する（Node 24.17 は blume の要件 22.12+ を満たす）。
- `paths: docs/**` トリガーは変更しない。

## 検証（成功基準）

1. `pnpm install` が通る（catalog 変更後）。
2. `pnpm --filter docs build` が成功し `docs/dist/` が生成される。
3. `blume preview` で en/ja 両ロケールについて、全ページの表示・サイドバー構成（グループ名・順序が現行と一致）・言語スイッチャー・検索の動作を確認する。
4. `pnpm lint`（prettier + eslint）が通る。
5. ビルドサマリーで sitemap / llms.txt / redirects の出力を確認する。

## リスク

- blume は v1.0.3（2026年7月リリース）と非常に新しく、破壊的変更や未成熟な部分に当たる可能性がある。問題が解消できない場合は `.blume/` の eject（標準 Astro プロジェクト化）という逃げ道がある。
- `blume build` の出力（trailing slash の扱い等）が Starlight と異なる場合、想定外の URL 変化が起きうる。実装時にビルド出力の実 URL を新旧対応表と突き合わせて確認する。
