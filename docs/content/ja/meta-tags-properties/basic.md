---
title: Basic
sidebar:
  order: 1
---

## title / titleTemplate

```svelte
<MetaTags title="This is my title" titleTemplate="Svelte Meta Tags | %s" />
<!-- 出力: <title>Svelte Meta Tags | This is my title</title> -->
```

```svelte
<MetaTags title="This is my title" titleTemplate="%s | Svelte Meta Tags" />
<!-- 出力: <title>This is my title | Svelte Meta Tags</title> -->
```

`titleTemplate` 内の `%s` は `title` に置き換えられます。置換はグローバルに行われるため、`%s` が複数含まれていてもすべて置き換えられます。`title` が設定されていない場合、`titleTemplate` だけでは `<title>` タグは一切レンダリングされません。

## description

```svelte
<MetaTags description="Example Description." />
<!-- 出力: <meta name="description" content="Example Description." /> -->
```

## canonical

```svelte
<MetaTags canonical="https://www.example.com/page" />
<!-- 出力: <link rel="canonical" href="https://www.example.com/page" /> -->
```

## robots

```svelte
<MetaTags robots="noindex,nofollow" />
```

デフォルトは `index,follow` です。`robots` を何も渡さなくても `<meta name="robots">` タグはレンダリングされます。タグ自体を完全に無効化したい場合は `robots={false}` を設定してください。

```svelte
<MetaTags robots={false} />
<!-- <meta name="robots"> タグはレンダリングされません -->
```

> `robots` が `false`（またはその他の falsy な値）のときに `additionalRobotsProps` を設定すると、追加のディレクティブを紐付ける先がなくなるため、コンソールに警告が出力されます。[Additional Robots Props](/ja/meta-tags-properties/additional-robots-props) を参照してください。

## keywords

```svelte
<MetaTags keywords={['svelte', 'seo', 'meta tags']} />
<!-- 出力: <meta name="keywords" content="svelte, seo, meta tags" /> -->
```
