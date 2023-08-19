<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Profile Page Title | Svelte Meta Tags"
  description="Description of profile page"
  openGraph={{
    title: 'Open Graph Profile Title',
    description: 'Description of open graph profile',
    url: 'https://www.example.com/@firstlast123',
    type: 'profile',
    profile: {
      firstName: 'First',
      lastName: 'Last',
      username: 'firstlast123',
      gender: 'male'
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-firstlast123-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt firstlast123 A'
      },
      {
        url: 'https://www.test.ie/og-image-firstlast123-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt firstlast123 B'
      },
      {
        url: 'https://www.test.ie/og-image-firstlast123-03.jpg',
        width: 600,
        height: 400,
        alt: 'Og Image Alt firstlast123 C'
      },
      {
        url: 'https://www.test.ie/og-image-firstlast123-04.jpg',
        width: 400,
        height: 400,
        alt: 'Og Image Alt firstlast123 D'
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

<h1>Profile SEO</h1>
