<img src="./.github/logo.svg" alt="svelte-meta-tags" width="512" />

[![CI](https://github.com/oekazuma/svelte-meta-tags/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/oekazuma/svelte-meta-tags/actions/workflows/ci.yml)
[![download](https://img.shields.io/npm/dt/svelte-meta-tags.svg)](https://www.npmjs.com/package/svelte-meta-tags)
[![npm](https://img.shields.io/npm/v/svelte-meta-tags)](https://www.npmjs.com/package/svelte-meta-tags)
[![MIT](https://img.shields.io/npm/l/svelte-meta-tags)](https://opensource.org/licenses/MIT)

Svelte Meta Tags is a plugin that makes managing your SEO easier in Svelte projects.

[Demo](https://svelte.dev/repl/ffd783c9b8e54d97b6b7cac6eadace42)

This library is inspired by [next-seo](https://github.com/garmeeh/next-seo)

**Would you like to support this project?**

<a href="https://www.buymeacoffee.com/oekazuma" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

**Table of Contents**

- [Installing](#-installing)
- [Usage](#-usage)
- [Properties](#properties)
  - [Twitter](#twitter)
  - [Facebook](#facebook)
  - [robotsProps](#robotsprops)
  - [Alternate](#alternate)
  - [Additional Meta Tags](#additional-meta-tags)
  - [Additional Link Tags](#additional-link-tags)
- [Open Graph](#open-graph)
  - [Open Graph Examples](#open-graph-examples)
    - [Basic](#basic)
    - [Video](#video)
    - [Article](#article)
    - [Book](#book)
    - [Profile](#profile)
- [JSON-LD](#json-ld)
  - [Using schema-dts](#using-schema-dts)
  - [JSON-LD Examples](#json-ld-examples)
    - [Article](#article)
    - [Breadcrumb](#breadcrumb)
    - [Product](#product)
    - [Course](#course)
    - [DataSet](#dataset)
    - [FAQ](#faq)
- [Types Import](#types-import)
  - [Types Import Examples](#types-import-examples)

### 📦 Installing

```shell
npm install -D svelte-meta-tags
```

or

```shell
yarn add -D svelte-meta-tags
```

or

```shell
pnpm add -D svelte-meta-tags
```

### 🚀 Usage

**Example with just title and description:**

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Example Title" description="Example Description." />
```

**Typical page example:**

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Using More of Config"
  description="This example uses more of the available config options."
  canonical="https://www.canonical.ie/"
  openGraph={{
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt'
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second'
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' }
    ],
    site_name: 'SiteName'
  }}
  twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Using More of Config',
    description: 'This example uses more of the available config options.',
    image: 'https://www.example.ie/twitter-image.jpg',
    imageAlt: 'Twitter image alt'
  }}
  facebook={{
    appId: '1234567890'
  }}
/>
```

### Properties

| Property                           | Type                    | Description                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                            | string                  | Sets the page meta title.                                                                                                                                                                                                                                                                                                                             |
| `noindex`                          | boolean (default false) | Sets whether page should be indexed or not                                                                                                                                                                                                                                                                                                            |
| `nofollow`                         | boolean (default false) | Sets whether page should be followed or not                                                                                                                                                                                                                                                                                                           |
| `additionRobotsProps`              | Object                  | Set the more meta information for the `X-Robots-Tag` [More Info](#robotsprops)                                                                                                                                                                                                                                                                        |
| `description`                      | string                  | Sets the page meta description.                                                                                                                                                                                                                                                                                                                       |
| `canonical`                        | string                  | Set the page canonical url.                                                                                                                                                                                                                                                                                                                           |
| `mobileAlternate.media`            | string                  | Set what screen size the mobile website should be served from                                                                                                                                                                                                                                                                                         |
| `mobileAlternate.href`             | string                  | Set the mobile page alternate url                                                                                                                                                                                                                                                                                                                     |
| `languageAlternates`               | array                   | Set the language of the alternate urls. Expects array of objects with the shape: `{ hrefLang: string, href: string }`                                                                                                                                                                                                                                 |
| `additionalMetaTags`               | array                   | Allows you to add a meta tag that is not documented here. [More Info](#additional-meta-tags)                                                                                                                                                                                                                                                          |
| `additionalLinkTags`               | array                   | Allows you to add a link tag that is not documented here. [More Info](#additional-link-tags)                                                                                                                                                                                                                                                          |
| `twitter.cardType`                 | string                  | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`                                                                                                                                                                                                                                                              |
| `twitter.site`                     | string                  | @username for the website used in the card footer .                                                                                                                                                                                                                                                                                                   |
| `twitter.handle`                   | string                  | @username for the content creator / author (outputs as `twitter:creator`)                                                                                                                                                                                                                                                                             |
| `twitter.title`                    | string                  | The concise title for the related content                                                                                                                                                                                                                                                                                                             |
| `twitter.description`              | string                  | The description that concisely summarizes the content as appropriate for presentation within a Tweet. You should not re-use the title as the description or use this field to describe the general services provided by the website                                                                                                                   |
| `twitter.image`                    | string                  | The URL to a unique image representing the content of the page. Images for this Card support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported |
| `twitter.imageAlt`                 | string                  | The text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.                                                                                                                                                                                                              |
| `facebook.appId`                   | string                  | Used for Facebook Insights, you must add a facebook app ID to your page to for it                                                                                                                                                                                                                                                                     |
| `openGraph.url`                    | string                  | The canonical URL of your object that will be used as its permanent ID in the graph.                                                                                                                                                                                                                                                                  |
| `openGraph.type`                   | string                  | The type of your object. Depending on the type you specify, other properties may also be required [More Info](#open-graph)                                                                                                                                                                                                                            |
| `openGraph.title`                  | string                  | The open graph title, this can be different than your meta title.                                                                                                                                                                                                                                                                                     |
| `openGraph.description`            | string                  | The open graph description, this can be different than your meta description.                                                                                                                                                                                                                                                                         |
| `openGraph.images`                 | array                   | An array of images to be used as a preview. If multiple supplied you can choose one when sharing. [See Examples](#open-graph-examples)                                                                                                                                                                                                                |
| `openGraph.videos`                 | array                   | An array of videos (object)                                                                                                                                                                                                                                                                                                                           |
| `openGraph.locale`                 | string                  | The locale the open graph tags are marked up in.                                                                                                                                                                                                                                                                                                      |
| `openGraph.site_name`              | string                  | If your object is part of a larger web site, the name which should be displayed for the overall site.                                                                                                                                                                                                                                                 |
| `openGraph.profile.firstName`      | string                  | Person's first name.                                                                                                                                                                                                                                                                                                                                  |
| `openGraph.profile.lastName`       | string                  | Person's last name.                                                                                                                                                                                                                                                                                                                                   |
| `openGraph.profile.username`       | string                  | Person's username.                                                                                                                                                                                                                                                                                                                                    |
| `openGraph.profile.gender`         | string                  | Person's gender.                                                                                                                                                                                                                                                                                                                                      |
| `openGraph.book.authors`           | string[]                | Writers of the article. [See Examples](#open-graph-examples)                                                                                                                                                                                                                                                                                          |
| `openGraph.book.isbn`              | string                  | The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)                                                                                                                                                                                                                                                                          |
| `openGraph.book.releaseDate`       | datetime                | The date the book was released.                                                                                                                                                                                                                                                                                                                       |
| `openGraph.book.tags`              | string[]                | Tag words associated with this book.                                                                                                                                                                                                                                                                                                                  |
| `openGraph.article.publishedTime`  | datetime                | When the article was first published. [See Examples](#open-graph-examples)                                                                                                                                                                                                                                                                            |
| `openGraph.article.modifiedTime`   | datetime                | When the article was last changed.                                                                                                                                                                                                                                                                                                                    |
| `openGraph.article.expirationTime` | datetime                | When the article is out of date after.                                                                                                                                                                                                                                                                                                                |
| `openGraph.article.authors`        | string[]                | Writers of the article.                                                                                                                                                                                                                                                                                                                               |
| `openGraph.article.section`        | string                  | A high-level section name. E.g. Technology                                                                                                                                                                                                                                                                                                            |
| `openGraph.article.tags`           | string[]                | Tag words associated with this article.                                                                                                                                                                                                                                                                                                               |

#### Twitter

```js
twitter={{
  handle: '@handle',
  site: '@site',
  cardType: 'summary_large_image',
  title: 'Twitter',
  description: 'Twitter',
  image: 'https://www.example.ie/twitter-image.jpg',
  imageAlt: 'Twitter image alt'
}}
```

Check out the Twitter [documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary) for more information.

#### Facebook

```js
facebook={{
  appId: '1234567890',
}}
```

Add this to your SEO config to include the fb:app_id meta if you need to enable Facebook insights for your site. Information regarding this can be found in facebook's [documentation](https://developers.facebook.com/docs/sharing/webmasters/)

#### robotsProps

In addition to `index, follow` the `robots` meta tag accepts more properties to archive a more accurate crawling and serve better snippets for SEO bots that crawl your page.

Example:

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  robotsProps={{
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

**Available properties**

| Property           | Type                      | Description                                                                                                                                                                                     |
| ------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noarchive`        | boolean                   | Do not show a [cached link](https://support.google.com/websearch/answer/1687222) in search results.                                                                                             |
| `nosnippet`        | boolean                   | Do not show a text snippet or video preview in the search results for this page.                                                                                                                |
| `maxSnippet`       | number                    | Use a maximum of [number] characters as a textual snippet for this search result. [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)               |
| `maxImagePreview`  | 'none','standard','large' | Set the maximum size of an image preview for this page in a search results.                                                                                                                     |
| `maxVideoPreview`  | number                    | Use a maximum of [number] seconds as a video snippet for videos on this page in search results. [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives) |
| `notranslate`      | boolean                   | Do not offer translation of this page in search results.                                                                                                                                        |
| `noimageindex`     | boolean                   | Do not index images on this page.                                                                                                                                                               |
| `unavailableAfter` | string                    | Do not show this page in search results after the specified date/time. The date/time must be specified in a widely adopted format including, but not limited to RFC 822, RFC 850, and ISO 8601. |

For more reference about the `X-Robots-Tag` visit [Google Search Central - Control Crawling and Indexing](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)

#### Alternate

This link relation is used to indicate a relation between a desktop and a mobile website to search engines.

Example:

```js
mobileAlternate={{
  media: 'only screen and (max-width: 640px)',
  href: 'https://m.canonical.ie'
}}
```

```js
languageAlternates={[
  {
    hrefLang: 'de-AT',
    href: 'https://www.canonical.ie/de'
  }
]}
```

#### Additional Meta Tags

This allows you to add any other meta tags that are not covered in the `config`.

`content` is required. Then either `name`, `property` or `httpEquiv`. (Only one on each)

Example:

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    name: 'application-name',
    content: 'Svelte-Meta-Tags'
  },
  {
    httpEquiv: 'x-ua-compatible',
    content: 'IE=edge; chrome=1'
  }
]}
```

Invalid Examples:

These are invalid as they contain more than one of `name`, `property` and `httpEquiv` on the same entry.

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    name: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    property: 'application-name',
    httpEquiv: 'application-name',
    content: 'Svelte-Meta-Tags'
  }
]}
```

One thing to note on this is that it currently only supports unique tags.
This means it will only render one tag per unique `name` / `property` / `httpEquiv`. The last one defined will be rendered.

Example:

If you pass:

```js
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'John Doe'
  },
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  }
]}
```

it will result in this being rendered:

```html
<meta property="dc:creator" content="Jane Doe" />,
```

#### Additional Link Tags

This allows you to add any other link tags that are not covered in the `config`.

`rel` and `href` is required.

Example:

```js
additionalLinkTags={[
  {
    rel: 'icon',
    href: 'https://www.test.ie/favicon.ico'
  },
  {
    rel: 'apple-touch-icon',
    href: 'https://www.test.ie/touch-icon-ipad.jpg',
    sizes: '76x76'
  },
  {
    rel: 'manifest',
    href: '/manifest.json'
  }
]}
```

it will result in this being rendered:

```html
<link rel="icon" href="https://www.test.ie/favicon.ico" />
<link rel="apple-touch-icon" href="https://www.test.ie/touch-icon-ipad.jpg" sizes="76x76" />
<link rel="manifest" href="/manifest.json" />
```

## Open Graph

For the full specification please check out <http://ogp.me/>

Svelte Meta Tags currently supports:

- [Basic](#basic)
- [Video](#video)
- [Article](#article)
- [Book](#book)
- [Profile](#profile)

### Open Graph Examples

#### Basic

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    type: 'website',
    url: 'https://www.example.com/page',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt'
      },
      {
        url: 'https://www.example.ie/og-image-2.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt 2'
      }
    ]
  }}
/>
```

#### Video

Full info on [http://ogp.me/](http://ogp.me/#type_video)

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Video Page Title"
  description="Description of video page"
  openGraph={{
    title: 'Open Graph Video Title',
    description: 'Description of open graph video',
    url: 'https://www.example.com/videos/video-title',
    type: 'video.movie',
    video: {
      actors: [
        {
          profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
          role: 'Protagonist'
        },
        {
          profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
          role: 'Antagonist'
        }
      ],
      directors: [
        'https://www.example.com/directors/@firstnameA-lastnameA',
        'https://www.example.com/directors/@firstnameB-lastnameB'
      ],
      writers: [
        'https://www.example.com/writers/@firstnameA-lastnameA',
        'https://www.example.com/writers/@firstnameB-lastnameB'
      ],
      duration: 680000,
      releaseDate: '2022-12-21T22:04:11Z',
      tags: ['Tag A', 'Tag B', 'Tag C']
    },
    site_name: 'SiteName'
  }}
/>
```

#### Article

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    title: 'Open Graph Article Title',
    description: 'Description of open graph article',
    url: 'https://www.example.com/articles/article-title',
    type: 'article',
    article: {
      publishedTime: '2017-06-21T23:04:13Z',
      modifiedTime: '2018-01-21T18:04:43Z',
      expirationTime: '2022-12-21T22:04:11Z',
      section: 'Section II',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB'
      ],
      tags: ['Tag A', 'Tag B', 'Tag C']
    },
    images: [
      {
        url: 'https://www.test.ie/images/cover.jpg',
        width: 850,
        height: 650,
        alt: 'Photo of text'
      }
    ]
  }}
/>
```

#### Book

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    title: 'Open Graph Book Title',
    description: 'Description of open graph book',
    url: 'https://www.example.com/books/book-title',
    type: 'book',
    book: {
      releaseDate: '2018-09-17T11:08:13Z',
      isbn: '978-3-16-148410-0',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB'
      ],
      tags: ['Tag A', 'Tag B', 'Tag C']
    },
    images: [
      {
        url: 'https://www.test.ie/images/book.jpg',
        width: 850,
        height: 650,
        alt: 'Cover of the book'
      }
    ]
  }}
/>
```

#### Profile

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    title: 'Open Graph Profile Title',
    description: 'Description of open graph profile',
    url: 'https://www.example.com/@firstlast123',
    type: 'profile',
    profile: {
      firstName: 'First',
      lastName: 'Last',
      username: 'firstlast123',
      gender: 'female'
    },
    images: [
      {
        url: 'https://www.test.ie/images/profile.jpg',
        width: 850,
        height: 650,
        alt: 'Profile Photo'
      }
    ]
  }}
/>
```

## JSON-LD

JSON-LD allow for more customized and rich representation for example in search results.

To discover all the different content types JSON-LD offers check out: https://developers.google.com/search/docs/guides/search-gallery

It is also possible to use multiple `<JsonLd />` components in a single page.

### Using `schema-dts`

This plugin uses [schema-dts](https://github.com/google/schema-dts), so it also provides types other than the usage examples below.

### JSON-LD Examples

#### Article

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/article'
    },
    headline: 'Article headline',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg'
    ],
    datePublished: '2015-02-05T08:00:00+08:00',
    dateModified: '2015-02-05T09:20:00+08:00',
    author: {
      '@type': 'Person',
      name: 'John Doe'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Google',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.jpg'
      }
    }
  }}
/>
```

#### Breadcrumb

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Books',
        item: 'https://example.com/books'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Science Fiction',
        item: 'https://example.com/books/sciencefiction'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Award Winners'
      }
    ]
  }}
/>
```

#### Product

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Product',
    name: 'Executive Anvil',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg'
    ],
    description:
      "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
    sku: '0446310786',
    mpn: '925872',
    brand: {
      '@type': 'Brand',
      name: 'ACME'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Fred Benson'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      reviewCount: '89'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://example.com/anvil',
      priceCurrency: 'USD',
      price: '119.99',
      priceValidUntil: '2020-11-20',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock'
    }
  }}
/>
```

#### Course

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Course',
    name: 'Introduction to Computer Science and Programming',
    description: 'Introductory CS course laying out the basics.',
    provider: {
      '@type': 'Organization',
      name: 'University of Technology - Eureka',
      sameAs: 'http://www.ut-eureka.edu'
    }
  }}
/>
```

#### DataSet

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Dataset',
    name: 'name of the dataset',
    description: 'The description needs to be at least 50 characters long',
    license: 'https//www.example.com'
  }}
/>
```

#### FAQ

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long is the delivery time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '3-5 business days.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I find information about product recalls?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Read more on under information.'
        }
      }
    ]
  }}
/>
```

## Types Import

You can import and use the types `MetaTagsProps` and `JsonLdProps`.

### Types Import Examples

```svelte
<script lang="ts">
  import { MetaTags, JsonLd } from 'svelte-meta-tags';
  import type { MetaTagsProps, JsonLdProps } from 'svelte-meta-tags';

  const metatags: MetaTagsProps = {
    title: 'Types Page Title | Svelte Meta Tags',
    description: 'Description of Types page',
    canonical: 'https://www.canonical.ie/',
    openGraph: {
      type: 'website',
      url: 'https://www.example.com/page',
      locale: 'en_IE',
      title: 'Open Graph Title',
      description: 'Open Graph Description',
      images: [
        {
          url: 'https://www.example.ie/og-image.jpg',
          width: 800,
          height: 600,
          alt: 'Og Image Alt'
        }
      ],
      site_name: 'SiteName'
    },
    twitter: {
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
      title: 'Types Page Title | Svelte Meta Tags',
      description: 'Description of Types page',
      image: 'https://www.example.ie/twitter-image.jpg',
      imageAlt: 'Twitter image alt'
    },
    facebook: {
      appId: '1234567890'
    }
  };

  const jsonld: JsonLdProps = {
    schema: {
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://google.com/article'
      },
      headline: 'Article headline',
      image: [
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg'
      ],
      datePublished: '2015-02-05T08:00:00+08:00',
      dateModified: '2015-02-05T09:20:00+08:00',
      author: {
        '@type': 'Person',
        name: 'John Doe'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Google',
        logo: {
          '@type': 'ImageObject',
          url: 'https://google.com/logo.jpg'
        }
      }
    }
  };
</script>

<MetaTags {...metatags} />

<JsonLd {...jsonld} />
```

## License

MIT
