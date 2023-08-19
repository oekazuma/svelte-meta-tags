<script>
  import { MetaTags, JsonLd } from 'svelte-meta-tags';
</script>

<MetaTags title="JSON-LD Body Page Title | Svelte Meta Tags" description="Description of JSON-LD Body page" />

<JsonLd
  output="body"
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

<JsonLd
  output="body"
  schema={{
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
  }}
/>

<h1>JSON-LD Body SEO</h1>
