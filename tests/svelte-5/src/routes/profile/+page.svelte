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
    images: [{ url: 'https://www.test.ie/og-image-firstlast123-01.jpg' }]
  }}
/>

<h1>Profile SEO</h1>
