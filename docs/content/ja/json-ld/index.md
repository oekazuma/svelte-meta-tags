---
title: JSON-LD
---

`JsonLd` は、プレーンオブジェクト、オブジェクトの配列、または `schema-dts` 型のオブジェクトから `<script type="application/ld+json">` ブロックをレンダリングします。

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

`@context: "https://schema.org"` は自動的に追加されるため、自分で指定する必要はありません。

## output: "head" と "body"

`output` はデフォルトで `"head"` になっており、`<script>` タグは `<svelte:head>` 内にレンダリングされます。代わりにコンポーネントが配置された場所にインラインでレンダリングしたい場合は `output="body"` を指定します（構造化データを、それが説明する内容のすぐ隣など、DOM 上の特定の位置に配置したい場合に便利です）。

```svelte
<JsonLd output="body" schema={{ '@type': 'Organization', name: 'Example Corp' }} />
```

## 複数のスキーマ

配列を渡すと、同じ `<script>` ブロック内に複数の JSON-LD オブジェクトがレンダリングされます。また、`{ '@graph': [...] }` でラップすると、単純な配列ではなく単一のリンクされたグラフとして表現できます（推奨の方法です — 配列形式は正しく動作するものの、Safari などの一部のツールがコンソールにエラーを出力することがあります）。詳しくは [JSON-LD Multiple Examples](/ja/json-ld/json-ld-properties/json-ld-multiple-examples) を参照してください。

## TypeScriptサポート

このライブラリは `schema` prop の型付けに [schema-dts](https://github.com/google/schema-dts) を使用しているため、このセクションの例以外にも、あらゆる schema.org の型が利用可能で、型チェックの対象になります。利用可能なスキーマの型を調べるには、[Google の検索ギャラリー](https://developers.google.com/search/docs/guides/search-gallery)を参照してください。
