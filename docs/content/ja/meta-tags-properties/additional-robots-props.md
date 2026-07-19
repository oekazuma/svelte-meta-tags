---
title: AdditionalRobotsProps
sidebar:
  order: 5
---

`index, follow` に加えて、`robots` メタタグは、より正確なクロールをアーカイブし、ページをクロールする SEO ボットに適切なスニペットを提供するために、より多くのプロパティを受け入れます。

## 例

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  additionalRobotsProps={{
    noarchive: true,
    nosnippet: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1,
    notranslate: true,
    noimageindex: true,
    unavailableAfter: '25 Jun 2010 15:00:00 PST'
  }}
/>
```

## 利用可能なプロパティ

| プロパティ         | 型                        | 説明                                                                                                                                                                                        |
| ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noarchive`        | boolean                   | 検索結果に[キャッシュされたリンク](https://support.google.com/websearch/answer/1687222)を表示しない                                                                                         |
| `nosnippet`        | boolean                   | このページの検索結果にテキストスニペットやビデオプレビューを表示しない                                                                                                                      |
| `maxSnippet`       | number                    | この検索結果のテキスト スニペットとして最大 [number] 文字を使用します [詳細](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=ja#directives)                  |
| `maxImagePreview`  | 'none','standard','large' | 検索結果でこのページの画像プレビューの最大サイズを設定します                                                                                                                                |
| `maxVideoPreview`  | number                    | 検索結果に表示されるこのページの動画の動画スニペットとして最大 [number] 秒を使用します [詳細](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=ja#directives) |
| `notranslate`      | boolean                   | 検索結果にこのページの翻訳を表示しない                                                                                                                                                      |
| `noimageindex`     | boolean                   | このページの画像をインデックスしない                                                                                                                                                        |
| `unavailableAfter` | string                    | 指定した日付/時刻以降はこのページを検索結果に表示しません。日付/時刻は、RFC 822、RFC 850、ISO 8601 など、広く受け入れられている形式でなければなりません                                     |

`X-Robots-Tag` の詳細については、[Google 検索セントラル - クロールとインデックス登録の制御](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=ja#directives) をご覧ください。
