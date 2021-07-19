# svelte-meta-tags

[![npm](https://img.shields.io/npm/v/svelte-meta-tags)](https://www.npmjs.com/package/svelte-meta-tags) [![npm](https://img.shields.io/npm/l/svelte-meta-tags)](https://opensource.org/licenses/MIT)

:warning: There may be some disruptive changes before v1.0.0!

Svelte Meta Tags is a lightweight library for SEO in Svelte (Made with SvelteKit)

This library is inspired by [next-seo](https://github.com/garmeeh/next-seo)

### Installing

```shell
npm install --save svelte-meta-tags
```

or

```shell
yarn add svelte-meta-tags
```

### Usage

```svelte
<script>
  import MetaTags from 'svelte-meta-tags';
</script>

<MetaTags title="Example Title" description="Example Description." />
```

### Properties

| Property                           | Type                          | Description                                                                                       |
| ---------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `title`                            | string                        | Sets the page meta title.                                                                         |
| `description`                      | string                        | Sets the page meta description.                                                                   |
| `robots`                           | string (default index,follow) | Sets the page meta robots.                                                                        |
| `keywords`                         | string                        | Set the page keywords.                                                                            |
| `canonical`                        | string                        | Set the page canonical url.                                                                       |
| `twitter.cardType`                 | string                        | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`          |
| `twitter.site`                     | string                        | @username for the website used in the card footer .                                               |
| `twitter.handle`                   | string                        | @username for the content creator / author (outputs as `twitter:creator`)                         |
| `openGraph.type`                   | string                        | The type of your object. Depending on the type you specify, other properties may also be required |
| `openGraph.title`                  | string                        | The open graph title, this can be different than your meta title.                                 |
| `openGraph.description`            | string                        | The open graph description, this can be different than your meta description.                     |
| `openGraph.url`                    | string                        | The canonical URL of your object that will be used as its permanent ID in the graph.              |
| `openGraph.images`                 | object[]                      | An array of images to be used as a preview. If multiple supplied you can choose one when sharing. |
| `openGraph.article.publishedTime`  | datetime                      | When the article was first published. .                                                           |
| `openGraph.article.modifiedTime`   | datetime                      | When the article was last changed.                                                                |
| `openGraph.article.expirationTime` | datetime                      | When the article is out of date after.                                                            |
| `openGraph.article.authors`        | string[]                      | Writers of the article.                                                                           |
| `openGraph.article.section`        | string                        | A high-level section name. E.g. Technology                                                        |
| `openGraph.article.tags`           | string[]                      | Tag words associated with this article.                                                           |
| `jsonLd`                           | object                        | Data in `ld+json` format.                                                                         |

## License

MIT
