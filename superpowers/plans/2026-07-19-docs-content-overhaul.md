# ドキュメントサイト内容刷新 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `docs/` サイト（英語 + 日本語）の全コンテンツを、`packages/svelte-meta-tags/src/lib/` の実装と完全一致するよう書き直し、クイックスタート・Utilitiesページを新設した新しい情報設計に再構成する。

**Architecture:** blume の filesystem-derived ルーティング（`docs/content/**`、ロケール別は `content/ja/**`）。各ページは frontmatter (`title`, `sidebar.order`) + Markdown/MDX 本文。グループの表示名・順序はフォルダごとの `meta.ts`（ロケール別ラベル）/ `meta.$.ts`（全ロケール共有ラベル）で制御する。

**Tech Stack:** blume 1.1.0、Markdown/MDX、schema-dts（JSON-LD の型）

**Spec:** `superpowers/specs/2026-07-19-docs-content-overhaul-design.md`

## Global Constraints

- 対象は `docs/content/**`（英語）と `docs/content/ja/**`（日本語）のみ。`docs/blume.config.ts` や `packages/svelte-meta-tags/src/lib/` のコードは変更しない。
- 各タスクは「英語ページを書く → 対応する日本語ページを書く」の順で進める（全英語→全日本語、ではない）。
- 日本語は既存ページの文体（です・ます調）に合わせる。
- 型シグネチャは `packages/svelte-meta-tags/src/lib/types.d.ts` と一言一句一致させる（プロパティ名・オプショナル修飾・リテラル型の並び順まで）。
- Prettier: 120桁・シングルクォート・trailing comma なし。各タスクのコミット前に `pnpm format` が通ること。
- changeset は**不要**（docs サイトのみの内部変更）。
- 作業ブランチ: `docs/migrate-to-blume`（既存、Starlight→blume移行と同じブランチで継続する）。

## 参照: 実装の正確な仕様（全タスク共通）

以降のタスクで使う、`packages/svelte-meta-tags/src/lib/` から書き起こした正確な仕様。

**`Twitter` interface（`types.d.ts:44-66`）:**
```ts
interface Twitter {
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  title?: string;
  description?: string;
  creator?: string;
  creatorId?: string;
  image?: string;
  imageAlt?: string;
  player?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
  appNameIphone?: string;
  appIdIphone?: string;
  appUrlIphone?: string;
  appNameIpad?: string;
  appIdIpad?: string;
  appUrlIpad?: string;
  appNameGoogleplay?: string;
  appIdGoogleplay?: string;
  appUrlGoogleplay?: string;
}
```
`handle` というプロパティは存在しない（v4で `creator` に改名済み）。

**`LinkTag` interface（`types.d.ts:174-212`）:**
```ts
interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  title?: string;
  media?: string;
  sizes?: string;
  type?: string;
  color?: string;
  imagesrcset?: string;
  imagesizes?: string;
  integrity?: string;
  as?:
    | 'fetch' | 'audio' | 'audioworklet' | 'document' | 'embed' | 'font' | 'frame'
    | 'iframe' | 'image' | 'json' | 'manifest' | 'object' | 'paintworklet' | 'report'
    | 'script' | 'serviceworker' | 'sharedworker' | 'style' | 'track' | 'video'
    | 'webidentity' | 'worker' | 'xslt';
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: ReferrerPolicy; // DOM組み込み型。'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
}
```

**`MetaTagsProps`（`types.d.ts:214-229`、`keywords` を含む）:**
```ts
interface MetaTagsProps {
  title?: string;
  titleTemplate?: string;
  robots?: string | boolean;
  additionalRobotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  twitter?: Twitter;
  facebook?: Facebook;
  openGraph?: OpenGraph;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
  keywords?: ReadonlyArray<string>;
}
```

**`MetaTags.svelte` の挙動（重要な仕様）:**
- `robots` のデフォルトは `'index,follow'`。`robots === false` の場合のみ `<meta name="robots">` タグ自体を出力しない。
- `updatedTitle = title && (titleTemplate?.replace(/%s/g, title) ?? title)` — `titleTemplate` 内の `%s` は**すべて**（グローバル置換）`title` に置き換わる。`title` が無ければ `titleTemplate` だけを指定しても何も出力されない。
- `$effect` で `robots` が falsy（`false` 等）かつ `additionalRobotsProps` が設定されている場合、`console.warn('additionalRobotsProps cannot be used when robots is set to false')` を出す。
- Twitter フォールバック: `twitter.title || openGraph?.title || updatedTitle`、`twitter.description || openGraph?.description || description`。image系にフォールバックは無い。
- OpenGraphフォールバック: `og:url` は `openGraph.url || canonical`。`og:title` は `openGraph.title || updatedTitle`。`og:description` は `openGraph.description || description`。
- `og:type` は `openGraph.type.toLowerCase()` で判定し、以下の条件で追加ブロックが出る:
  - `profile` かつ `openGraph.profile` がある → `profile:first_name` 等
  - `book` かつ `openGraph.book` がある → `book:author`（配列）、`book:isbn`、`book:release_date`、`book:tag`（配列）
  - `article` かつ `openGraph.article` がある → `article:published_time` 等
  - `video.movie` | `video.episode` | `video.tv_show` は無条件で、`video.other` は **`openGraph.video` がある場合のみ** video ブロック（`video:actor`/`video:actor:role`、`video:director`、`video:writer`、`video:duration`、`video:release_date`、`video:tag`、`video:series`）が出る
- `openGraph.image`（単数）は `images`（複数）の**先頭に追加**されてから出力される（`image` → `images[0]` → `images[1]` ... の順）。
- `additionalMetaTags` の各エントリの `httpEquiv` フィールドは `http-equiv` 属性名にリネームされて出力される（`httpEquiv` という属性名では出力されない）。
- `keywords` は `keywords.join(', ')` で1つの `<meta name="keywords">` に結合される。

**`JsonLd.svelte` の挙動:**
- `output` のデフォルトは `'head'`。`'body'` を指定すると `<svelte:head>` の外、コンポーネントの配置場所にそのまま出力される。
- `schema` が配列なら各要素に、単一オブジェクト（`{'@graph': [...]}` 形式含む）ならそのオブジェクト自体に `'@context': 'https://schema.org'` が自動付与される。
- `<script>` タグは `'<scri' + 'pt ...>'` の形で文字列結合されている（HTMLパーサーが `<script>` を誤認識するのを避けるため）。

**`deepMerge`（`deepMerge.ts`）の正確なマージルール（上から順に評価）:**
1. `target`・`source` のどちらかが `null`/`undefined` なら、存在する方をそのまま返す（両方無ければ `{}`）。
2. プロパティごとに、**target側の値が `Date` インスタンスまたは関数なら target側の値を採用**（source側で上書きされない）。
3. target側がDate/関数でなく、**source側の値が `Date` インスタンスまたは関数なら source側の値を採用**。
4. target・source 両方がプレーンオブジェクト（配列でない）なら再帰的に `deepMerge`。
5. target・source 両方が配列なら、**source側の配列で丸ごと置換**（結合(concat)はしない）。
6. それ以外は、source側の値が `undefined` でなければ source側の値、`undefined` なら target側の値を採用。

**`defineBaseMetaTags` / `definePageMetaTags`（`define.ts`）:**
- `defineBaseMetaTags(obj)` は `{ baseMetaTags: Object.freeze(obj) }` を返すだけの薄いヘルパー。
- `definePageMetaTags(obj)` は `{ pageMetaTags: Object.freeze(obj) }` を返すだけの薄いヘルパー。
- 使わなくても `return { baseMetaTags: Object.freeze<MetaTagsProps>({ ... }) }` を自分で書けば同じ結果になる。

**v5でのCHANGELOG抜粋（Migration Guide用）:**
```
## 5.0.0
### Major Changes
- feat: update `schema-dts` to v2
  schema-dts (JsonLd の schema prop の型を提供するパッケージ) が v1 から v2 に更新された。
  JsonLd の実行時の挙動は変わらない。型レベルでの破壊的変更:
  - アプリが schema-dts に直接依存している場合は ^2.0.0 に更新が必要。v1/v2混在は
    TypeScriptの "Excessive stack depth" エラーを引き起こす場合がある。
  - schema-dts v2 自体に型の破壊的変更あり（Role の非再帰化、Quantity のコアDataType化、
    schema.org非準拠型のexport名変更）。
  - schema-dts v2 は schema-dts-lib に依存し、typescript >=4.9.5 を peerDependency として
    要求する。strict-peer-dependencies=true の環境では typescript を明示的に追加する必要が
    ある場合がある。
```

---

### Task 1: Utilities グループを新設し、deepMerge / define系の説明を拡充する

**Files:**
- Create: `docs/content/utilities/meta.$.ts`
- Move+Rewrite: `docs/content/deep-merge-function.md` → `docs/content/utilities/deep-merge.md`
- Create: `docs/content/utilities/define-meta-tags.md`
- Move+Rewrite: `docs/content/ja/deep-merge-function.md` → `docs/content/ja/utilities/deep-merge.md`
- Create: `docs/content/ja/utilities/define-meta-tags.md`

**Interfaces:**
- Consumes: 上記「参照: 実装の正確な仕様」の deepMerge / define 系セクション
- Produces: `Utilities` グループ（`/utilities/deep-merge`, `/utilities/define-meta-tags`）。Task 7 の Usage ページからここへリンクする。

- [ ] **Step 1: グループ meta ファイルを作成**

`docs/content/utilities/meta.$.ts`（英日共通ラベル。deepMergeもdefine系も両ロケールで同じ機能名なので `meta.$.ts` でよい）:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'Utilities',
  order: 4
});
```

- [ ] **Step 2: 英語版 `deep-merge.md` を書く**

`docs/content/utilities/deep-merge.md` を以下の内容で作成する（Step 1 で `docs/content/utilities/` が作られているので、`git mv` で移動してから書き換える）:

```bash
git mv docs/content/deep-merge-function.md docs/content/utilities/deep-merge.md
```

全文をこの構成にする（frontmatterの `sidebar.order` は削除してよい。グループ内順序は `meta.$.ts` 側のファイル配置順に依存しないため、明示したい場合は `order: 1` を付ける）:

```md
---
title: Deep Merge
sidebar:
  order: 1
---

`deepMerge(target, source)` deeply merges two `MetaTagsProps`-shaped objects. Use it to override a layout's default meta tags with page-specific values, as in the following example.

## Merge rules

`deepMerge` applies these rules per property, in order:

1. If `target` or `source` is `null`/`undefined`, the other one is returned as-is (or `{}` if both are missing).
2. If the **target** value is a `Date` instance or a function, the target value wins — the source value is ignored, even if it's also a `Date`/function.
3. Otherwise, if the **source** value is a `Date` instance or a function, the source value wins.
4. If both values are plain objects (not arrays), they're merged recursively.
5. If both values are arrays, the **source array replaces the target array entirely** — arrays are never concatenated.
6. Otherwise, the source value is used unless it's `undefined`, in which case the target value is kept.

```ts
import { deepMerge } from 'svelte-meta-tags';

const target = {
  title: 'Default Title',
  description: 'Default Description',
  openGraph: { images: [{ url: 'https://example.com/default.jpg' }] }
};

const source = {
  title: undefined,
  description: 'Page Description',
  openGraph: { images: [{ url: 'https://example.com/page.jpg' }] }
};

deepMerge(target, source);
// => {
//   title: 'Default Title',                                          // undefined source keeps target
//   description: 'Page Description',                                 // source wins
//   openGraph: { images: [{ url: 'https://example.com/page.jpg' }] } // array replaced, not concatenated
// }
```

## +layout.svelte

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

## +layout.ts

```ts
import { defineBaseMetaTags } from 'svelte-meta-tags';

export const load = ({ url }) => {
  const baseTags = defineBaseMetaTags({
    title: 'Default',
    titleTemplate: '%s | Svelte Meta Tags',
    description: 'Svelte Meta Tags is a Svelte component for managing meta tags and SEO in your Svelte applications.',
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: 'website',
      url: new URL(url.pathname, url.origin).href,
      locale: 'en_IE',
      title: 'Open Graph Title',
      description: 'Open Graph Description',
      siteName: 'SiteName',
      images: [
        {
          url: 'https://www.example.ie/og-image.jpg',
          alt: 'Og Image Alt',
          width: 800,
          height: 600,
          secureUrl: 'https://www.example.ie/og-image.jpg',
          type: 'image/jpeg'
        }
      ]
    }
  });

  return { ...baseTags };
};
```

## +page.ts

```ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageTags = definePageMetaTags({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  });

  return { ...pageTags };
};
```

See [Define Meta Tags](/utilities/define-meta-tags) for what `defineBaseMetaTags`/`definePageMetaTags` actually do.
```

- [ ] **Step 3: 英語版 `define-meta-tags.md` を新規作成**

`docs/content/utilities/define-meta-tags.md`:

```md
---
title: Define Meta Tags
sidebar:
  order: 2
---

`defineBaseMetaTags` and `definePageMetaTags` are thin wrappers used in SvelteKit `load` functions. Each one just freezes your input object and wraps it under a named property:

```ts
const defineBaseMetaTags = (obj: MetaTagsProps) => ({ baseMetaTags: Object.freeze(obj) });
const definePageMetaTags = (obj: MetaTagsProps) => ({ pageMetaTags: Object.freeze(obj) });
```

They exist purely to type and shape your `load` return value — there's no other behavior. You can skip them entirely and write the equivalent by hand:

```ts
// +layout.ts, without defineBaseMetaTags
export const load = () => {
  return { baseMetaTags: Object.freeze<MetaTagsProps>({ title: 'Default' }) };
};
```

## Usage

```ts
// +layout.ts
import { defineBaseMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const baseTags = defineBaseMetaTags({
    title: 'Default',
    description: 'Welcome to my application'
  });

  return { ...baseTags };
};
```

```ts
// +page.ts
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageTags = definePageMetaTags({
    title: 'About Us',
    description: 'Learn more about our company'
  });

  return { ...pageTags };
};
```

Combine the two with [`deepMerge`](/utilities/deep-merge) in your root `+layout.svelte`.
```

- [ ] **Step 4: 日本語版 `deep-merge.md` を作成**

`docs/content/ja/utilities/` はまだ存在しないため、先に作成してから移動する（`meta.$.ts` はロケール共有なので `docs/content/ja/utilities/meta.ts`/`meta.$.ts` は不要）:

```bash
mkdir -p docs/content/ja/utilities
git mv docs/content/ja/deep-merge-function.md docs/content/ja/utilities/deep-merge.md
```

英語版Step 2と同じ構成・同じコード例で、地の文を日本語（です・ます調）にして書く。マージルール1〜6は必ず番号付きリストのまま日本語に訳し、コード例のコメント（`// undefined source keeps target` 等）も日本語にする。見出しは「マージのルール」「+layout.svelte」「+layout.ts」「+page.ts」とする。

- [ ] **Step 5: 日本語版 `define-meta-tags.md` を作成**

`docs/content/ja/utilities/define-meta-tags.md` を英語版Step 3と同じ構成で日本語で書く。タイトルは「Define Meta Tags」のまま（固有の関数名を含むページ名なので無理に訳さない）。

- [ ] **Step 6: ビルド確認**

Run: `pnpm --filter docs build`
Expected: 成功。`/utilities/deep-merge`, `/utilities/define-meta-tags`, `/ja/utilities/deep-merge`, `/ja/utilities/define-meta-tags` が生成される。

- [ ] **Step 7: コミット**

```bash
git add docs/content
git commit -m "docs: add Utilities section with accurate deepMerge merge rules"
```

---

### Task 2: Types配下を実装と完全に一致させる

**Files:**
- Modify: `docs/content/types/twitter.md`
- Modify: `docs/content/types/link-tag.md`
- Modify: `docs/content/types/meta-tags-props.md`
- Modify: `docs/content/types/meta.ts` (order を 4→5 に変更)
- Modify: `docs/content/ja/types/twitter.md`
- Modify: `docs/content/ja/types/link-tag.md`
- Modify: `docs/content/ja/types/meta-tags-props.md`
- Modify: `docs/content/ja/types/meta.ts` (order を 4→5 に変更)

**Interfaces:**
- Consumes: 上記「参照」セクションの `Twitter`, `LinkTag`, `MetaTagsProps` 型定義
- Produces: 実装と完全一致した型リファレンス。Task 3 の MetaTags Properties ページから相互リンクする。

- [ ] **Step 1: `types/twitter.md` を実装と完全一致させる**

全文をこの内容にする（`sidebar.order: 6` は維持）:

```md
---
title: Twitter
sidebar:
  order: 6
---

```ts
interface Twitter {
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  title?: string;
  description?: string;
  creator?: string;
  creatorId?: string;
  image?: string;
  imageAlt?: string;
  player?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
  appNameIphone?: string;
  appIdIphone?: string;
  appUrlIphone?: string;
  appNameIpad?: string;
  appIdIpad?: string;
  appUrlIpad?: string;
  appNameGoogleplay?: string;
  appIdGoogleplay?: string;
  appUrlGoogleplay?: string;
}
```

See [Twitter](/meta-tags-properties/twitter) for usage and fallback behavior.
```

- [ ] **Step 2: `types/link-tag.md` を実装と完全一致させる**

全文をこの内容にする（`sidebar.order: 10` は維持）:

````md
---
title: LinkTag
sidebar:
  order: 10
---

```ts
interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  title?: string;
  media?: string;
  sizes?: string;
  type?: string;
  color?: string;
  imagesrcset?: string;
  imagesizes?: string;
  integrity?: string;
  as?:
    | 'fetch'
    | 'audio'
    | 'audioworklet'
    | 'document'
    | 'embed'
    | 'font'
    | 'frame'
    | 'iframe'
    | 'image'
    | 'json'
    | 'manifest'
    | 'object'
    | 'paintworklet'
    | 'report'
    | 'script'
    | 'serviceworker'
    | 'sharedworker'
    | 'style'
    | 'track'
    | 'video'
    | 'webidentity'
    | 'worker'
    | 'xslt';
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: ReferrerPolicy;
}
```

`referrerPolicy` uses the DOM's built-in `ReferrerPolicy` type (`'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'`).

See [Additional Link Tags](/meta-tags-properties/additional-link-tags) for usage.
````

- [ ] **Step 3: `types/meta-tags-props.md` に `keywords` を追加**

全文をこの内容にする（`sidebar.order: 1` は維持）:

```md
---
title: MetaTagsProps
sidebar:
  order: 1
---

```ts
interface MetaTagsProps {
  title?: string;
  titleTemplate?: string;
  robots?: string | boolean;
  additionalRobotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  twitter?: Twitter;
  facebook?: Facebook;
  openGraph?: OpenGraph;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
  keywords?: ReadonlyArray<string>;
}
```
```

- [ ] **Step 4: 日本語版3ファイルを同じ内容で更新**

`docs/content/ja/types/twitter.md`, `docs/content/ja/types/link-tag.md`, `docs/content/ja/types/meta-tags-props.md` を、Step 1〜3の型シグネチャ（コードブロックは完全に同一、変更しない）で更新する。「See [Twitter](...)」等のリンク文だけ日本語（「使い方とフォールバック動作は[Twitter](/ja/meta-tags-properties/twitter)を参照してください。」等）にする。リンク先パスは `/ja/` プレフィックス付きにする。

- [ ] **Step 5: 他のTypesページが実装と一致していることを確認**

Run（各ファイルを目視で実装と突き合わせる）:
- `docs/content/types/additional-types/*.md`（9ファイル）と `packages/svelte-meta-tags/src/lib/types.d.ts` の `BaseMetaTag`, `HTML5MetaTag`, `RDFaMetaTag`, `HTTPEquivMetaTag`, `OpenGraphImage`, `OpenGraphAudio`, `OpenGraphProfile`, `OpenGraphBook`, `OpenGraphArticle`, `OpenGraphVideo`, `OpenGraphVideoActors` を1つずつ突き合わせる
- `docs/content/types/open-graph.md`, `types/facebook.md`, `types/mobile-alternate.md`, `types/language-alternate.md`, `types/additional-robots-props.md`, `types/json-ld-props.md`, `types/meta-tag.md` も同様に突き合わせる

Expected: 差分があれば実装に合わせて修正する（この計画作成時点の監査ではこれらは一致していたが、念のため再確認する）。

- [ ] **Step 5.5: Types グループの表示順序を Utilities の後ろに修正**

Task 1 で新設した `Utilities` グループが `order: 4` を使っているため、既存の `Types` グループ（同じく `order: 4`）と衝突している。`Types` を `order: 5` に変更する:

`docs/content/types/meta.ts` を以下に変更:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: 'Types',
  order: 5
});
```

`docs/content/ja/types/meta.ts` を以下に変更:

```ts
import { defineMeta } from 'blume';

export default defineMeta({
  title: '型定義',
  order: 5
});
```

- [ ] **Step 6: ビルドと型チェック**

Run: `pnpm --filter docs build && pnpm --filter docs check`
Expected: 両方成功。

- [ ] **Step 7: コミット**

```bash
git add docs/content
git commit -m "docs: fix Types reference pages to match actual type definitions"
```

---

### Task 3: MetaTags Properties を再構成する（Basic新設・index.md修正・alternate拡充）

**Files:**
- Create: `docs/content/meta-tags-properties/basic.md`
- Create: `docs/content/ja/meta-tags-properties/basic.md`
- Modify: `docs/content/meta-tags-properties/index.md`
- Modify: `docs/content/ja/meta-tags-properties/index.md`
- Delete: `docs/content/meta-tags-properties/title-template.md`
- Delete: `docs/content/ja/meta-tags-properties/title-template.md`
- Modify: `docs/content/meta-tags-properties/alternate.md`
- Modify: `docs/content/ja/meta-tags-properties/alternate.md`
- Modify: `docs/content/meta-tags-properties/additional-meta-tags.md`
- Modify: `docs/content/ja/meta-tags-properties/additional-meta-tags.md`
- Modify: `docs/content/meta-tags-properties/twitter.md`
- Modify: `docs/content/ja/meta-tags-properties/twitter.md`

**Interfaces:**
- Consumes: 上記「参照」セクションの `MetaTags.svelte` の挙動
- Produces: `/meta-tags-properties/basic` ページ、修正済み `index.md`

- [ ] **Step 1: 英語版 `basic.md` を新規作成**

`docs/content/meta-tags-properties/basic.md`（`title-template.md` の内容を吸収する）:

```md
---
title: Basic
sidebar:
  order: 1
---

## title / titleTemplate

```svelte
<MetaTags title="This is my title" titleTemplate="Svelte Meta Tags | %s" />
<!-- outputs: <title>Svelte Meta Tags | This is my title</title> -->
```

```svelte
<MetaTags title="This is my title" titleTemplate="%s | Svelte Meta Tags" />
<!-- outputs: <title>This is my title | Svelte Meta Tags</title> -->
```

`%s` in `titleTemplate` is replaced with `title` — every occurrence, since the replacement is global. If `title` is not set, `titleTemplate` alone renders no `<title>` tag at all.

## description

```svelte
<MetaTags description="Example Description." />
<!-- outputs: <meta name="description" content="Example Description." /> -->
```

## canonical

```svelte
<MetaTags canonical="https://www.example.com/page" />
<!-- outputs: <link rel="canonical" href="https://www.example.com/page" /> -->
```

## robots

```svelte
<MetaTags robots="noindex,nofollow" />
```

Defaults to `index,follow` — a `<meta name="robots">` tag is rendered even if you don't pass `robots` at all. Set `robots={false}` to suppress the tag entirely:

```svelte
<MetaTags robots={false} />
<!-- no <meta name="robots"> tag is rendered -->
```

> Setting `additionalRobotsProps` while `robots` is `false` (or otherwise falsy) logs a console warning, since the extra directives would have nothing to attach to. See [Additional Robots Props](/meta-tags-properties/additional-robots-props).

## keywords

```svelte
<MetaTags keywords={['svelte', 'seo', 'meta tags']} />
<!-- outputs: <meta name="keywords" content="svelte, seo, meta tags" /> -->
```
```

- [ ] **Step 2: `title-template.md` を削除**

```bash
git rm docs/content/meta-tags-properties/title-template.md
```

- [ ] **Step 3: 英語版 `index.md` を修正（タイポ修正、ショートカット追加、Basicへのリンク）**

`docs/content/meta-tags-properties/index.md` のテーブルを修正する:
1. `` `additionRobotsProps` `` → `` `additionalRobotsProps` ``（タイポ修正）
2. `` `openGraph.images` `` の行の直前に以下の行を追加:

```md
| `openGraph.image`                  | object                                     | Shortcut for a single image. Prepended before `images` when both are set — see [Open Graph](/open-graph/basic#single-image-shortcut)                                                                                                                                                                                                                                                                                                                                                                                                 |
```

3. `` `openGraph.article.tags` `` の行の後（テーブル最終行の後）に以下を追加:

```md
| `openGraph.video`                  | object                                     | Video-specific properties (actors, directors, writers, duration, etc.) — see [Video](/open-graph/video)                                                                                                                                                                                                                                                                                                                                                                                                                              |
```

4. frontmatterの直後、テーブルの前に以下の一文を追加:

```md
For `title`, `titleTemplate`, `description`, `canonical`, `robots`, and `keywords`, see [Basic](/meta-tags-properties/basic) for detailed behavior and examples.
```

- [ ] **Step 4: 英語版 `alternate.md` を拡充**

全文をこの内容にする:

```md
---
title: Alternates
sidebar:
  order: 6
---

Use `mobileAlternate` and `languageAlternates` to point search engines at related versions of the current page.

## Mobile alternate

Indicates a relationship between this desktop page and a separate mobile version, for the screen sizes where the mobile version should be served:

```svelte
<MetaTags
  mobileAlternate={{
    media: 'only screen and (max-width: 640px)',
    href: 'https://m.example.com/page'
  }}
/>
<!-- outputs: <link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.example.com/page" /> -->
```

## Language alternates

An array of `{ hrefLang, href }` pairs — one `<link rel="alternate" hrefLang="...">` is rendered per entry:

```svelte
<MetaTags
  languageAlternates={[
    { hrefLang: 'de-AT', href: 'https://www.example.com/de' },
    { hrefLang: 'fr-FR', href: 'https://www.example.com/fr' }
  ]}
/>
```
```

- [ ] **Step 5: 英語版 `additional-meta-tags.md` に `httpEquiv` の属性名変換を明記**

`docs/content/meta-tags-properties/additional-meta-tags.md` の「## Example」の直前に以下を追加:

```md
`httpEquiv` is rendered as the `http-equiv` HTML attribute (not `httpEquiv`) — this is the one field name in `additionalMetaTags` that doesn't map 1:1 to its attribute name.

```

- [ ] **Step 6: 英語版 `twitter.md` に主要な省略プロパティの例を1つ追記**

`docs/content/meta-tags-properties/twitter.md` の「## Example」のコードブロックの直後に以下を追加:

```md
`Twitter` also accepts `creatorId`, an `app`-card set (`player`, `playerWidth`, `playerHeight`, `playerStream`) for the `player` card type, and per-platform app fields (`appNameIphone`/`appIdIphone`/`appUrlIphone`, `appNameIpad`/..., `appNameGoogleplay`/...) for the `app` card type. See [Twitter](/types/twitter) for the full list.
```

- [ ] **Step 7: 日本語版を同じ内容で作成・修正**

Step 1〜6と同じ変更を日本語版（`docs/content/ja/meta-tags-properties/basic.md` 新規作成、`title-template.md` 削除、`index.md`・`alternate.md`・`additional-meta-tags.md`・`twitter.md` 修正）に対して行う。地の文は日本語（です・ます調）、コードブロックとプロパティ名は変更しない。リンクは `/ja/` プレフィックス付き（例: `/ja/meta-tags-properties/basic`）にする。

```bash
git rm docs/content/ja/meta-tags-properties/title-template.md
```

- [ ] **Step 8: グループ順序を確認**

`docs/content/meta-tags-properties/meta.ts` と `docs/content/ja/meta-tags-properties/meta.ts` の `order` はグループ自体の順序（既存の値のまま）なので変更不要。ページ内の並びは frontmatter の `sidebar.order` で決まる。`basic.md` の `order: 1` により他ページより上に来ることを確認する。

- [ ] **Step 9: ビルドとリンク検証**

Run: `pnpm --filter docs build && pnpm --filter docs exec blume validate`
Expected: 両方成功。リンク切れ0件。

- [ ] **Step 10: コミット**

```bash
git add docs/content
git commit -m "docs: restructure MetaTags Properties with new Basic page"
```

---

### Task 4: Open Graph ページの正確性を高める

**Files:**
- Modify: `docs/content/open-graph/video.md`
- Modify: `docs/content/open-graph/index.md`
- Modify: `docs/content/ja/open-graph/video.md`
- Modify: `docs/content/ja/open-graph/index.md`

**Interfaces:**
- Consumes: 上記「参照」セクションの `og:type` 条件分岐ルール

- [ ] **Step 1: 英語版 `video.md` に `video.episode`/`video.tv_show`/`video.other` を追記**

`docs/content/open-graph/video.md` の既存コード例の直後に以下を追加:

```md
`type` also accepts `video.episode`, `video.tv_show`, and `video.other` — all four render the same `video:*` properties from the `video` object. `video.movie`, `video.episode`, and `video.tv_show` render the block unconditionally; `video.other` only renders it when `video` is also provided.
```

- [ ] **Step 2: 英語版 `index.md` に基本プロパティへの導線を追加**

`docs/content/open-graph/index.md` の箇条書きリストの直前に以下を追加:

```md
For the properties common to every type (`url`, `title`, `description`, `images`/`image`, `videos`, `audio`, `locale`, `siteName`), see [Basic](/open-graph/basic). The pages below cover the type-specific blocks that render additional `og:*` properties when `openGraph.type` matches.
```

- [ ] **Step 3: 日本語版を同じ内容で修正**

`docs/content/ja/open-graph/video.md`, `docs/content/ja/open-graph/index.md` に、Step 1〜2と同じ内容を日本語で追加する。リンクは `/ja/open-graph/basic` にする。

- [ ] **Step 4: ビルド確認**

Run: `pnpm --filter docs build`
Expected: 成功。

- [ ] **Step 5: コミット**

```bash
git add docs/content
git commit -m "docs: document all og:type video variants in Open Graph pages"
```

---

### Task 5: JSON-LD の基礎説明を拡充する

**Files:**
- Modify: `docs/content/json-ld/index.md`
- Modify: `docs/content/ja/json-ld/index.md`

**Interfaces:**
- Consumes: 上記「参照」セクションの `JsonLd.svelte` の挙動

- [ ] **Step 1: 英語版 `index.md` を拡充**

全文をこの内容にする:

```md
---
title: JSON-LD
---

`JsonLd` renders a `<script type="application/ld+json">` block from a plain object, an array of objects, or a `schema-dts` typed object.

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Organization',
    name: 'Example Corp',
    url: 'https://www.example.com'
  }}
/>
<!-- outputs: <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization",...}</script> -->
```

`@context: "https://schema.org"` is added automatically — you never need to include it yourself.

## output: "head" vs "body"

`output` defaults to `"head"`, which renders the `<script>` tag inside `<svelte:head>`. Set `output="body"` to render it inline at the component's location instead (useful when you need the structured data to appear at a specific point in the DOM, e.g. next to the content it describes):

```svelte
<JsonLd output="body" schema={{ '@type': 'Organization', name: 'Example Corp' }} />
```

## Multiple schemas

Pass an array to render multiple `<script>` blocks, or wrap them in `{ '@graph': [...] }` to render them as a single linked graph (recommended — some tools, like Safari, log a console error for the array form even though it works correctly). See [JSON-LD Multiple Examples](/json-ld/json-ld-properties/json-ld-multiple-examples).

## TypeScript support

This library uses [schema-dts](https://github.com/google/schema-dts) for the `schema` prop's types, so every schema.org type — beyond the examples in this section — is available and type-checked. To discover available schema types, see [Google's Search Gallery](https://developers.google.com/search/docs/guides/search-gallery).
```

- [ ] **Step 2: 日本語版を同じ内容で拡充**

`docs/content/ja/json-ld/index.md` を、Step 1と同じ構成で日本語（です・ます調）で書く。見出しは「output: "head" と "body"」「複数のスキーマ」「TypeScriptサポート」とする。リンクは `/ja/json-ld/json-ld-properties/json-ld-multiple-examples` にする。

- [ ] **Step 3: ビルド確認**

Run: `pnpm --filter docs build`
Expected: 成功。

- [ ] **Step 4: コミット**

```bash
git add docs/content
git commit -m "docs: explain JsonLd output modes and @graph in JSON-LD overview"
```

---

### Task 6: Quickstart ページを新設する

**Files:**
- Create: `docs/content/quickstart.mdx`
- Create: `docs/content/ja/quickstart.mdx`
- Modify: `docs/content/index.mdx`
- Modify: `docs/content/ja/index.mdx`

**Interfaces:**
- Produces: `/quickstart`, `/ja/quickstart`

- [ ] **Step 1: 英語版 `quickstart.mdx` を新規作成**

```md
---
title: Quickstart
sidebar:
  order: 1
---

Install the package:

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

Add `<MetaTags>` to any page or layout:

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="My Page"
  description="A short description of this page."
  canonical="https://example.com/my-page"
  openGraph={{
    title: 'My Page',
    description: 'A short description of this page.',
    images: [{ url: 'https://example.com/og-image.jpg', width: 1200, height: 630, alt: 'My Page' }]
  }}
/>
```

That's it — this renders `<title>`, `<meta name="description">`, `<link rel="canonical">`, and the `og:*` tags into `<svelte:head>`.

## Next steps

<CardGroup cols={2}>
  <Card title="Usage" icon="file-text" href="/usage">
    See patterns for sharing meta tags across a layout and its pages.
  </Card>
  <Card title="MetaTags Properties" icon="list" href="/meta-tags-properties/basic">
    Browse every available property, grouped by purpose.
  </Card>
</CardGroup>
```

- [ ] **Step 2: 日本語版 `quickstart.mdx` を新規作成**

Step 1と同じ構成・同じコード例で、地の文を日本語にする。見出しは「次のステップ」とする。Cardの `href` は `/ja/usage`, `/ja/meta-tags-properties/basic` にする。

- [ ] **Step 3: 英語版 `index.mdx` の「Get started」リンク先を更新**

`docs/content/index.mdx` の以下の箇所を変更する:

```md
  <Card title="Get started" icon="arrow-right" href="/installing">
    Install Svelte Meta Tags and set up your first meta tags.
  </Card>
```

を

```md
  <Card title="Get started" icon="arrow-right" href="/quickstart">
    Install Svelte Meta Tags and set up your first meta tags.
  </Card>
```

に変更する。

- [ ] **Step 4: 日本語版 `index.mdx` も同様に更新**

`docs/content/ja/index.mdx` の `href="/ja/installing"` を `href="/ja/quickstart"` に変更する。

- [ ] **Step 4.5: グループ外ページの表示順序を Quickstart の後ろに繰り下げ**

新設した `quickstart.mdx`（`sidebar.order: 1`）が、既存の `installing.mdx`（同じく `order: 1`）と衝突しているため、`installing.mdx` と `usage.mdx` の順序を1つずつ繰り下げる（`migration-guide.md` の `order: 4` は変更不要）:

- `docs/content/installing.mdx`, `docs/content/ja/installing.mdx`: `sidebar.order` を `1` → `2` に変更
- `docs/content/usage.mdx`, `docs/content/ja/usage.mdx`: `sidebar.order` を `2` → `3` に変更

- [ ] **Step 5: ビルドとリンク検証**

Run: `pnpm --filter docs build && pnpm --filter docs exec blume validate`
Expected: 両方成功。

- [ ] **Step 6: コミット**

```bash
git add docs/content
git commit -m "docs: add Quickstart page"
```

---

### Task 7: Usage ページを拡充する（フレームワーク対応の言及）

**Files:**
- Modify: `docs/content/usage.mdx`
- Modify: `docs/content/ja/usage.mdx`

- [ ] **Step 1: 英語版 `usage.mdx` の冒頭（Demoリンクの直後）にフレームワーク対応の一文を追加**

`docs/content/usage.mdx` の `[Demo ↗](...)` 行の直後に以下を追加:

```md

`<MetaTags>` and `<JsonLd>` only write into `<svelte:head>` (or, for `<JsonLd output="body">`, inline) — they don't depend on SvelteKit internals. They work in any Svelte project. The `load`-based patterns below (`+layout.ts`/`+page.ts`, `deepMerge`) are SvelteKit-specific; in a plain Svelte app, pass the same props directly to `<MetaTags>` from your own data-fetching logic.
```

- [ ] **Step 2: 日本語版 `usage.mdx` も同様に追記**

`docs/content/ja/usage.mdx` の `[デモ ↗](...)` 行の直後に、Step 1と同じ内容を日本語で追加する。

- [ ] **Step 3: ビルド確認**

Run: `pnpm --filter docs build`
Expected: 成功。

- [ ] **Step 4: コミット**

```bash
git add docs/content
git commit -m "docs: clarify svelte-meta-tags works outside SvelteKit too"
```

---

### Task 8: Migration Guide に v5 セクションを追加する

**Files:**
- Modify: `docs/content/migration-guide.md`
- Modify: `docs/content/ja/migration-guide.md`

**Interfaces:**
- Consumes: 上記「参照」セクションの v5 CHANGELOG抜粋

- [ ] **Step 1: 英語版に v5 セクションを追加**

`docs/content/migration-guide.md` の frontmatter 直後（`` `twitter.handle` has been renamed... `` の前）に以下を挿入する:

```md
## v5

`schema-dts` (the package providing the types for `JsonLd`'s `schema` prop) was updated from v1 to v2. `JsonLd`'s runtime behavior is unchanged — this is a type-level breaking change only:

- If your app depends on `schema-dts` directly, update it to `^2.0.0`. Mixing v1 and v2 types can cause TypeScript "Excessive stack depth" errors when assigning to the `schema` prop.
- `schema-dts` v2 has its own breaking type changes (non-recursive `Role`, `Quantity` as a core DataType, renamed non-schema.org type exports) — see the [schema-dts v2.0.0 release notes](https://github.com/google/schema-dts/releases/tag/v2.0.0).
- `schema-dts` v2 depends on `schema-dts-lib`, which declares `typescript >=4.9.5` as a peer dependency. Under strict peer-dependency enforcement (e.g. pnpm's `strict-peer-dependencies=true`), you may need to add `typescript` explicitly.

```

- [ ] **Step 2: 日本語版に同じ内容を追加**

`docs/content/ja/migration-guide.md` の frontmatter直後に、Step 1と同じ内容を日本語で追加する。見出しは「## v5」のまま。

- [ ] **Step 3: ビルド確認**

Run: `pnpm --filter docs build`
Expected: 成功。

- [ ] **Step 4: コミット**

```bash
git add docs/content
git commit -m "docs: add v5 (schema-dts v2) section to Migration Guide"
```

---

### Task 9: 最終検証

**Interfaces:**
- Consumes: Task 1〜8 の全成果物

- [ ] **Step 1: フルチェーンを一括実行**

Run: `pnpm format && pnpm lint && pnpm --filter docs check && pnpm --filter docs build && pnpm --filter docs exec blume validate && pnpm --filter docs exec blume doctor`
Expected: すべて成功。

- [ ] **Step 2: 英語・日本語のページ数が対応することを確認**

Run:
```bash
find docs/content -maxdepth 10 -type f \( -name '*.md' -o -name '*.mdx' \) -not -path '*/ja/*' | sed 's|docs/content/||' | sort > /tmp/en-pages.txt
find docs/content/ja -maxdepth 10 -type f \( -name '*.md' -o -name '*.mdx' \) | sed 's|docs/content/ja/||' | sort > /tmp/ja-pages.txt
diff /tmp/en-pages.txt /tmp/ja-pages.txt
```
Expected: 差分なし（ファイル名の集合が英日で完全一致する）。差分があれば抜けているページを作成する。

- [ ] **Step 3: フォーマットとlintの最終確認**

Run: `git status --short docs/content` で変更ファイル一覧を確認し、意図しない変更が無いことを目視する。

- [ ] **Step 4: 仕上げ**

superpowers:finishing-a-development-branch スキルに従い、PRへの反映方法をユーザーに確認する。PR本文にはドキュメント刷新の要約（型不一致の修正、Utilities新設、Quickstart新設、Migration GuideのV5追加など）を記載する。
