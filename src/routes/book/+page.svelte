<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Book Page Title | Svelte Meta Tags"
  description="Description of book page"
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
        url: 'https://www.test.ie/og-image-book-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Book Title A'
      },
      {
        url: 'https://www.test.ie/og-image-book-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Book Title B'
      },
      {
        url: 'https://www.test.ie/og-image-book-title-03.jpg',
        width: 600,
        height: 400,
        alt: 'Og Image Alt Book Title C'
      },
      {
        url: 'https://www.test.ie/og-image-book-title-04.jpg',
        width: 400,
        height: 400,
        alt: 'Og Image Alt Book Title D'
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

<h1>Book SEO</h1>
