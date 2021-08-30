<script>
  import MetaTags from 'svelte-meta-tags';
</script>

<MetaTags
  title="OLD JSON-LD Page Title | Svelte Meta Tags"
  description="Description of OLD JSON-LD page"
  jsonLd={{
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

<h1>OLD JSON-LD SEO</h1>
