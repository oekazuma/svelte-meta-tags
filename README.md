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

| Property                           | Type                    | Description                                                                                                           |
| ---------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `title`                            | string                  | Sets the page meta title.                                                                                             |
| `noindex`                          | boolean (default false) | Sets whether page should be indexed or not                                                                            |
| `nofollow`                         | boolean (default false) | Sets whether page should be followed or not                                                                           |
| `additionRobotsProps`              | Object                  | Set the more meta information for the `X-Robots-Tag`                                                                    |
| `description`                      | string                  | Sets the page meta description.                                                                                       |
| `canonical`                        | string                  | Set the page canonical url.                                                                                           |
| `mobileAlternate.media`            | string                  | Set what screen size the mobile website should be served from                                                         |
| `mobileAlternate.href`             | string                  | Set the mobile page alternate url                                                                                     |
| `languageAlternates`               | array                   | Set the language of the alternate urls. Expects array of objects with the shape: `{ hrefLang: string, href: string }` |
| `additionalMetaTags`               | array                   | Allows you to add a meta tag that is not documented here.                                                             |
| `additionalLinkTags`               | array                   | Allows you to add a link tag that is not documented here.                                                             |
| `twitter.cardType`                 | string                  | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`                              |
| `twitter.site`                     | string                  | @username for the website used in the card footer .                                                                   |
| `twitter.handle`                   | string                  | @username for the content creator / author (outputs as `twitter:creator`)                                             |
| `facebook.appId`                   | string                  | Used for Facebook Insights, you must add a facebook app ID to your page to for it                                     |
| `openGraph.url`                    | string                  | The canonical URL of your object that will be used as its permanent ID in the graph.                                  |
| `openGraph.type`                   | string                  | The type of your object. Depending on the type you specify, other properties may also be required                     |
| `openGraph.title`                  | string                  | The open graph title, this can be different than your meta title.                                                     |
| `openGraph.description`            | string                  | The open graph description, this can be different than your meta description.                                         |
| `openGraph.images`                 | array                   | An array of images to be used as a preview. If multiple supplied you can choose one when sharing.                     |
| `openGraph.videos`                 | array                   | An array of videos (object)                                                                                           |
| `openGraph.locale`                 | string                  | The locale the open graph tags are marked up in.                                                                      |
| `openGraph.site_name`              | string                  | If your object is part of a larger web site, the name which should be displayed for the overall site.                 |
| `openGraph.profile.firstName`      | string                  | Person's first name.                                                                                                  |
| `openGraph.profile.lastName`       | string                  | Person's last name.                                                                                                   |
| `openGraph.profile.username`       | string                  | Person's username.                                                                                                    |
| `openGraph.profile.gender`         | string                  | Person's gender.                                                                                                      |
| `openGraph.book.authors`           | string[]                | Writers of the article.                                                                                               |
| `openGraph.book.isbn`              | string                  | The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)                                          |
| `openGraph.book.releaseDate`       | datetime                | The date the book was released.                                                                                       |
| `openGraph.book.tags`              | string[]                | Tag words associated with this book.                                                                                  |
| `openGraph.article.publishedTime`  | datetime                | When the article was first published.                                                                                 |
| `openGraph.article.modifiedTime`   | datetime                | When the article was last changed.                                                                                    |
| `openGraph.article.expirationTime` | datetime                | When the article is out of date after.                                                                                |
| `openGraph.article.authors`        | string[]                | Writers of the article.                                                                                               |
| `openGraph.article.section`        | string                  | A high-level section name. E.g. Technology                                                                            |
| `openGraph.article.tags`           | string[]                | Tag words associated with this article.                                                                               |
| `jsonLd`                           | object                  | Data in `ld+json` format.                                                                                             |

## License

MIT
