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
    images: [{ url: 'https://www.test.ie/og-image-book-title-01.jpg' }]
  }}
/>

<h1>Book SEO</h1>
