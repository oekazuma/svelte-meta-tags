<script lang="ts">
  import { MetaTags, JsonLd, MetaTagsProps, JsonLdProps } from 'svelte-meta-tags';

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
      cardType: 'summary_large_image'
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

<h1>Types SEO</h1>
