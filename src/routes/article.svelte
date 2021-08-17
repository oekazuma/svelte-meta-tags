<script>
  import MetaTags from 'svelte-meta-tags';
  import Links from './_Links.svelte';
</script>

<MetaTags
  title="Article Page Title | Svelte Meta Tags"
  description="Description of article page"
  openGraph={{
    title: 'Open Graph Article Title',
    description: 'Description of open graph article',
    url: 'https://www.example.com/articles/article-title',
    type: 'article',
    article: {
      publishedTime: '2017-06-21T23:04:13Z',
      modifiedTime: '2018-01-21T18:04:43Z',
      expirationTime: '2022-12-21T22:04:11Z',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB'
      ],
      section: 'Section II',
      tags: ['Tag A', 'Tag B', 'Tag C']
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-article-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Article Title A'
      },
      {
        url: 'https://www.test.ie/og-image-article-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Article Title B'
      },
      {
        url: 'https://www.test.ie/og-image-article-title-03.jpg',
        width: 600,
        height: 400,
        alt: 'Og Image Alt Article Title C'
      },
      {
        url: 'https://www.test.ie/og-image-article-title-04.jpg',
        width: 400,
        height: 400,
        alt: 'Og Image Alt Article Title D'
      }
    ],
    site_name: 'SiteName'
  }}
  twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image'
  }}
/>

<h1>Article SEO</h1>
<Links />
