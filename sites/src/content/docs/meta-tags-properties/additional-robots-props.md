---
title: AdditionalRobotsProps
---

In addition to `index, follow` the `robots` meta tag accepts more properties to archive a more accurate crawling and serve better snippets for SEO bots that crawl your page.

## Example

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

## Available properties

| Property           | Type                      | Description                                                                                                                                                                                    |
| ------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noarchive`        | boolean                   | Do not display a [cached link](https://support.google.com/websearch/answer/1687222) in search results                                                                                          |
| `nosnippet`        | boolean                   | Do not show a text snippet or video preview in the search results for this page                                                                                                                |
| `maxSnippet`       | number                    | Use a maximum of [number] characters as the text snippet for this search result [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)                |
| `maxImagePreview`  | 'none','standard','large' | Set the maximum size of an image preview for this page in a search result                                                                                                                      |
| `maxVideoPreview`  | number                    | Use a maximum of [number] seconds as a video snippet for videos on this page in search results [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives) |
| `notranslate`      | boolean                   | Do not offer translation of this page in search results                                                                                                                                        |
| `noimageindex`     | boolean                   | Do not index images on this page                                                                                                                                                               |
| `unavailableAfter` | string                    | Do not show this page in search results after the specified date/time. The date/time must be in a widely accepted format, including but not limited to RFC 822, RFC 850, and ISO 8601          |

For more information on the `X-Robots-Tag` visit [Google Search Central - Control Crawling and Indexing](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)