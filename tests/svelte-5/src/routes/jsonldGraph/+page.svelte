<script>
  import { MetaTags, JsonLd } from 'svelte-meta-tags';
</script>

<MetaTags title="JSON-LD Graph Page Title | Svelte Meta Tags" description="Description of JSON-LD Graph page" />

<JsonLd
  schema={{
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': 'https://example.com/articles/1',
              name: 'foo'
            }
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
        },
        description: 'A most wonderful article'
      }
    ]
  }}
/>

<h1>JSON-LD Graph SEO</h1>
