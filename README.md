<img src="https://raw.githubusercontent.com/oekazuma/svelte-meta-tags/main/.github/logo.svg" alt="svelte-meta-tags" width="512" />

[![CI](https://github.com/oekazuma/svelte-meta-tags/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/oekazuma/svelte-meta-tags/actions/workflows/ci.yml)
[![download](https://img.shields.io/npm/dt/svelte-meta-tags.svg)](https://www.npmjs.com/package/svelte-meta-tags)
[![npm](https://img.shields.io/npm/v/svelte-meta-tags)](https://www.npmjs.com/package/svelte-meta-tags)
[![MIT](https://img.shields.io/npm/l/svelte-meta-tags)](https://opensource.org/licenses/MIT)

Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.

[Demo](https://svelte.dev/repl/ffd783c9b8e54d97b6b7cac6eadace42)

**Note: If you are migrating from v2.x to v3.x, [Please Read Migration Guide](https://github.com/oekazuma/svelte-meta-tags/issues/786)**

**Table of Contents**

- [Installing](#-installing)
- [Usage](#-usage)
- [MetaTags Properties](#metatags-properties)
  - [Title Template](#title-template)
  - [Twitter](#twitter)
  - [Facebook](#facebook)
  - [additionalRobotsProps](#additionalRobotsProps)
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
  - [JSON-LD Properties](#json-ld-properties)
  - [JSON-LD Examples](#json-ld-examples)
    - [Article](#article)
    - [Breadcrumb](#breadcrumb)
    - [Product](#product)
    - [Course](#course)
    - [DataSet](#dataset)
    - [FAQ](#faq)
  - [JSON-LD Multiple Examples](#json-ld-multiple-examples)
- [Types](#types)
- [Additional types](#additional-types)

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
  titleTemplate="%s | Svelte Meta Tags"
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
    siteName: 'SiteName'
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

**Overwriting default values with a child page:**

[Example](https://github.com/oekazuma/svelte-meta-tags/tree/main/example)

`+layout.svelte`

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';
  import extend from 'just-extend'; // Please provide functions that allow deep merging of objects, such as lodash.merge, deepmerge, just-extend.

  export let data;

  $: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<MetaTags {...metaTags} />

<slot />
```

`+layout.ts`

```ts
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ url }) => {
  const baseMetaTags = Object.freeze({
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
  }) satisfies MetaTagsProps;

  return {
    baseMetaTags
  };
};
```

`+page.ts`

```ts
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
  const pageMetaTags = Object.freeze({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  }) satisfies MetaTagsProps;

  return {
    pageMetaTags
  };
};
```

### MetaTags Properties

| Property                           | Type                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                            | string                                     | Sets the meta title of the page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `titleTemplate`                    | string                                     | Allows you to set the default title template that will be added to your title [More Info](#title-template)                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `robots`                           | string or boolean (default `index,follow`) | Sets the meta robots of the page ⚠ You can disable it completely by setting it to false, but use it with caution as there is a risk that the page will not be indexed⚠                                                                                                                                                                                                                                                                                                                                                              |
| `additionRobotsProps`              | Object                                     | Set the additional meta information for the `X-Robots-Tag` [More Info](#additionalRobotsProps)                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `description`                      | string                                     | Sets the meta description of the page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `canonical`                        | string                                     | Make the page canonical URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `keywords`                         | array                                      | Sets the meta keywords of the page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `mobileAlternate.media`            | string                                     | Set the screen size from which the mobile site will be served                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `mobileAlternate.href`             | string                                     | Set the alternate URL for the mobile page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `languageAlternates`               | array                                      | Set the language of the alternate urls. Expects array of objects with the shape: `{ hrefLang: string, href: string }`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `additionalMetaTags`               | array                                      | Allows you to add a meta tag that is not documented here [More Info](#additional-meta-tags)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `additionalLinkTags`               | array                                      | Allows you to add a link tag that is not documented here [More Info](#additional-link-tags)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `twitter.cardType`                 | string                                     | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `twitter.site`                     | string                                     | @username for the website used in the card footer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `twitter.handle`                   | string                                     | @username for the creator of the content (output as `twitter:creator`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `twitter.title`                    | string                                     | The concise title for the related content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `twitter.description`              | string                                     | The description that concisely summarizes the content in a manner suitable for presentation within a Tweet. You should not reuse the title as the description or use this field to describe the general services provided by the website                                                                                                                                                                                                                                                                                              |
| `twitter.image`                    | string                                     | The URL to a unique image that represents the content of the page. You should not use a generic image such as your site logo, author photo, or other image that spans multiple pages. Images for this card support a 1:1 aspect ratio with a minimum size of 144x144 pixels or a maximum size of 4096x4096 pixels. Images must be less than 5MB in size. The image will be cropped to a square on all platforms. JPG, PNG, WEBP, and GIF formats are supported. Only the first frame of an animated GIF is used. SVG is not supported |
| `twitter.imageAlt`                 | string                                     | The textual description of the image that conveys the essence of the image to visually impaired users. Maximum 420 characters                                                                                                                                                                                                                                                                                                                                                                                                         |
| `facebook.appId`                   | string                                     | For Facebook Insights, you will need to add a Facebook app ID to your page in order to use it                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `openGraph.url`                    | string                                     | The canonical URL of your object, which will be used as its permanent ID in the graph                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `openGraph.type`                   | string                                     | The type of your object. Depending on the type you specify, other properties may also be required [More Info](#open-graph)                                                                                                                                                                                                                                                                                                                                                                                                            |
| `openGraph.title`                  | string                                     | The open graph title, this can be different from your meta title                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `openGraph.description`            | string                                     | The open graph description, which may be different from your meta description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `openGraph.images`                 | array                                      | An array of images to use as previews. If multiple are provided, you can choose one when sharing [See Examples](#open-graph-examples)                                                                                                                                                                                                                                                                                                                                                                                                 |
| `openGraph.videos`                 | array                                      | An array of videos (object)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `openGraph.audio`                  | array                                      | An array of audio(object)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `openGraph.locale`                 | string                                     | The locale in which the open graph tags are highlighted                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `openGraph.siteName`               | string                                     | If your item is part of a larger website, the name that should be displayed for the entire site                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `openGraph.profile.firstName`      | string                                     | Person's first name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `openGraph.profile.lastName`       | string                                     | Person's last name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `openGraph.profile.username`       | string                                     | Person's username                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `openGraph.profile.gender`         | string                                     | Person's gender                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `openGraph.book.authors`           | string[]                                   | Author of the article [See Examples](#open-graph-examples)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `openGraph.book.isbn`              | string                                     | The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `openGraph.book.releaseDate`       | datetime                                   | The date the book was released                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `openGraph.book.tags`              | string[]                                   | Tag words related to this book                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `openGraph.article.publishedTime`  | datetime                                   | When the article was first published [See Examples](#open-graph-examples)                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `openGraph.article.modifiedTime`   | datetime                                   | When the item was last modified                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `openGraph.article.expirationTime` | datetime                                   | When the article is out of date after                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `openGraph.article.authors`        | string[]                                   | Author of the article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `openGraph.article.section`        | string                                     | A high-level section name. E.g. Technology                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `openGraph.article.tags`           | string[]                                   | Tag words associated with this article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

#### Title Template

Replace `%s` with your title string.

```
title = 'This is my title'
titleTemplate = 'Svelte Meta Tags | %s'
// outputs: Svelte Meta Tags | This is my title
```

```
title = 'This is my title'
titleTemplate = '%s | Svelte Meta Tags'
// outputs: This is my title | Svelte Meta Tags
```

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

See out the Twitter [documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary) for more information.

#### Facebook

```js
facebook={{
  appId: '1234567890',
}}
```

Add this to your SEO config to include the fb:app_id meta if you need to enable Facebook Insights for your site. Information on this can be found in Facebook's [documentation](https://developers.facebook.com/docs/sharing/webmasters/).

#### additionalRobotsProps

In addition to `index, follow` the `robots` meta tag accepts more properties to archive a more accurate crawling and serve better snippets for SEO bots that crawl your page.

Example:

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

**Available properties**

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

#### Alternate

This link relationship is used to indicate a relationship between a desktop and mobile website to search engines.

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

This allows you to add any other meta tags that are not required by the `config`.

`content` is required. Then either `name`, `property` or `httpEquiv`. (only one of each)

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

These are invalid because they contain more than one of `name`, `property`, and `httpEquiv` in the same entry.

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
    href: 'https://www.test.ie/manifest.json'
  }
]}
```

it will result in this being rendered:

```html
<link rel="icon" href="https://www.test.ie/favicon.ico" />
<link rel="apple-touch-icon" href="https://www.test.ie/touch-icon-ipad.jpg" sizes="76x76" />
<link rel="manifest" href="https://www.test.ie/manifest.json" />
```

## Open Graph

The full specification can be found at <http://ogp.me/>.

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
    siteName: 'SiteName'
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

JSON-LD allows for more customized and richer display, such as in search results.

To discover all the different content types that JSON-LD offers, go to: https://developers.google.com/search/docs/guides/search-gallery

Tips: If you want to handle multiple JSON-LDs on one page, pass an array to the `schema`.

### Using `schema-dts`

This plugin uses [schema-dts](https://github.com/google/schema-dts), so it provides other types than the examples below.

### JSON-LD Properties

| Property | Type                  | Description                                                                                              |
| -------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| `output` | string (default head) | Specifies whether to output json-ld in `<head>` or `<body>`. Possible values are either `head` or `body` |
| `schema` | Object                | Data in `ld+json` format [See Examples](#json-ld-examples)                                               |

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

### JSON-LD Multiple Examples

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={[
    {
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
    },
    {
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
  ]}
/>
```

## Types

The following types can be imported from `svelte-meta-tags`

### MetaTagsProps

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
}
```

### JsonLdProps

```ts
interface JsonLdProps {
  output?: 'head' | 'body';
  schema?: Thing | WithContext<Thing> | Thing[] | WithContext<Thing>[];
}
```

### AdditionalRobotsProps

```ts
interface AdditionalRobotsProps {
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}
```

### MobileAlternate

```ts
interface MobileAlternate {
  media: string;
  href: string;
}
```

### LanguageAlternate

```ts
interface LanguageAlternate {
  hrefLang: string;
  href: string;
}
```

### Twitter

```ts
interface Twitter {
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  handle?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}
```

### Facebook

```ts
interface Facebook {
  appId?: string;
}
```

### OpenGraph

```ts
interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImage>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  audio?: ReadonlyArray<OpenGraphAudio>;
  locale?: string;
  siteName?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}
```

### MetaTag

```ts
type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;
```

### LinkTag

```ts
interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  media?: string;
  sizes?: string;
  type?: string;
  color?: string;
  as?: string;
  crossOrigin?: string;
  referrerPolicy?: string;
}
```

## Additional types

The following are referenced by the public types documented above, but cannot be imported directly

### OpenGraphImage

```ts
interface OpenGraphImage {
  url: string;
  secureUrl?: string;
  type?: string;
  width?: number;
  height?: number;
  alt?: string;
}
```

### OpenGraphVideos

```ts
interface OpenGraphVideos {
  url: string;
  secureUrl?: string;
  type?: string;
  width?: number;
  height?: number;
}
```

### OpenGraphAudio

```ts
interface OpenGraphAudio {
  url: string;
  secureUrl?: string;
  type?: string;
}
```

### OpenGraphProfile

```ts
interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}
```

### OpenGraphBook

```ts
interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}
```

### OpenGraphArticle

```ts
interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}
```

### OpenGraphVideo

```ts
interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}
```

### OpenGraphVideoActors

```ts
interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}
```

### BaseMetaTag

```ts
interface BaseMetaTag {
  content: string;
}
```

### HTML5MetaTag

```ts
interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
  httpEquiv?: undefined;
}
```

### RDFaMetaTag

```ts
interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
  httpEquiv?: undefined;
}
```

### HTTPEquivMetaTag

```ts
interface HTTPEquivMetaTag extends BaseMetaTag {
  httpEquiv: 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
  name?: undefined;
  property?: undefined;
}
```

## License

MIT
