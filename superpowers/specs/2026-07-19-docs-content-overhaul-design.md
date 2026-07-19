# ドキュメントサイト内容刷新 設計

**Goal:** `docs/` サイト（英語 + 日本語）の全コンテンツを、現在のライブラリ実装（`packages/svelte-meta-tags/src/lib/`）と完全に一致するよう書き直し、初見のユーザーが迷わず使い始められる情報設計に再構成する。

**Background:** ドキュメントはかなり前に書かれた内容がStarlight→blume移行でそのまま引き継がれている。実装との突き合わせ監査で、型リファレンスページ（`types/twitter.md`, `types/link-tag.md` 等）が実装と一致していない（廃止済みプロパティが残る、新プロパティが欠落）、`deepMerge` の実際のマージルールが説明されていない、クイックスタート的なページが無い、といった重大なギャップが見つかった。

## 新しい情報設計（IA）

```text
(index)                          トップページ（現状維持、内容更新のみ）
Quickstart                       新設: インストール+最小コピペ例を1ページで完結
Installing                       現状維持
Usage                            拡充: 基本例、SvelteKit以外での使用可否、レイアウトパターン
MetaTags Properties (グループ)
  ├ Basic                        新設: title/titleTemplate/description/canonical/robots/keywords
  ├ Twitter
  ├ Facebook
  ├ Alternates                   mobile/language alternateの2種を統合
  ├ Additional Meta Tags
  ├ Additional Link Tags
  └ Additional Robots Props
Open Graph (グループ)             現状維持、正確性を担保
  ├ Basic / Article / Book / Profile / Video
JSON-LD (グループ)                output head/body、@graph、配列渡しなど基礎から拡充
  └ JSON-LD Properties/*
Utilities (グループ、新設)
  ├ Deep Merge                   deep-merge-function.md を移動、マージルールを明記
  └ Define Meta Tags             defineBaseMetaTags/definePageMetaTags 専用ページを新設
Types (グループ)                  「型シグネチャのリファレンス」として実装と完全一致させる
Migration Guide                  v3→v4に加えv4→v5(schema-dts v2)のセクションを追加
```

サイドバー順序（`meta.ts`/`meta.$.ts` の `order`）は上から順に採番する。

## 各ページの記述方針

**MetaTags Properties / Open Graph 配下:**

1. そのプロパティが何のためにあるかの一言説明
2. 型シグネチャの抜粋（`types.d.ts` から転記、書式を一致させる）
3. 基本のコード例
4. fallbackや条件分岐など「知らないとハマる」挙動を明記。対象:
   - Twitter: `twitter.title || openGraph.title || updatedTitle`（description も同様）
   - `titleTemplate`: `title` が無いと適用されない
   - `robots: false` の状態で `additionalRobotsProps` を設定すると `console.warn` される
   - `og:type` 条件分岐（article/book/profile/video.movie|episode|tv_show|other）の全パターン
   - `openGraph.image`（単数）と `images`（複数）の合成順
   - `additionalMetaTags` の `httpEquiv` → `http-equiv` 属性名への正規化

**Types配下:**

- 使い方の解説はせず、`types.d.ts` の型シグネチャをそのまま反映するリファレンスに徹する
- MetaTags Properties / Open Graph の対応ページへ相互リンクする
- 執筆時に対象の型定義と一つずつ突き合わせて転記する（自動生成の仕組みは今回のスコープ外）

**Utilities（deepMerge / define系）:**

- `deepMerge` はマージルールを先に明記してから実例を出す: 配列は置換（concatしない）、`Date`/関数は対象外でかつ**targetがDate/関数なら target優先**、source側の `undefined` はtargetの値を保持
- `defineBaseMetaTags` / `definePageMetaTags` は「`Object.freeze` して `baseMetaTags`/`pageMetaTags` にラップするだけの薄いヘルパー」という位置づけを明記し、使わない場合の代替記法も示す

**Migration Guide:**

- バージョン見出しごとに Breaking Changes / New Features を区切る形式に統一（CHANGELOG.mdの記載を要約）
- 追加するv5セクション: `schema-dts` v1→v2 移行（型レベルの破壊的変更、`Role`/`Quantity`/型エクスポート名の変更）

## 日英同時進行のワークフロー

1ページ（または1グループ）ずつ、英語版を書いてから対応する日本語版を書く、をページ単位で繰り返す（全英語ページ→全日本語ページ、ではない）。

## スコープ外

- 型リファレンスの自動生成（typedoc等の導入）
- `docs/` サイトの見た目・テーマ・blume設定変更（`blume.config.ts` は今回のタスクでは変更しない）
- ライブラリ本体（`packages/svelte-meta-tags/src/lib/`）のコード変更・仕様変更
- `example/` アプリの変更

## 成功基準

- `types/` 配下の全ページが `packages/svelte-meta-tags/src/lib/types.d.ts` の型定義と完全に一致する
- AGENTS.mdに記載された「easy to break」な挙動が、対応するプロパティページに明記されている
- 英語・日本語ページ数が対応する（1対1でミラーしている）
- `pnpm --filter docs build && pnpm --filter docs exec blume validate` が通る
