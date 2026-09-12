<script>
  import { MetaTags } from 'svelte-meta-tags';
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
    images: [{ url: 'https://www.test.ie/og-image-article-title-01.jpg' }]
  }}
/>

<h1>Article SEO</h1>
