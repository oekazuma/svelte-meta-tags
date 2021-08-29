<script>
  import { MetaTags } from 'svelte-meta-tags';
  import Links from './_Links.svelte';
</script>

<MetaTags
  title="Video Page Title | Svelte Meta Tags"
  description="Description of video page"
  openGraph={{
    title: 'Open Graph Video Title',
    description: 'Description of open graph video',
    url: 'https://www.example.com/videos/video-title',
    type: 'video.movie',
    video: {
      actors: [
        {
          profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
          role: 'Protagonist'
        },
        {
          profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
          role: 'Antagonist'
        }
      ],
      directors: [
        'https://www.example.com/directors/@firstnameA-lastnameA',
        'https://www.example.com/directors/@firstnameB-lastnameB'
      ],
      writers: [
        'https://www.example.com/writers/@firstnameA-lastnameA',
        'https://www.example.com/writers/@firstnameB-lastnameB'
      ],
      duration: 680000,
      releaseDate: '2022-12-21T22:04:11Z',
      tags: ['Tag A', 'Tag B', 'Tag C']
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-video-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Video Title A'
      },
      {
        url: 'https://www.test.ie/og-image-video-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Video Title B'
      },
      {
        url: 'https://www.test.ie/og-image-video-title-03.jpg',
        width: 600,
        height: 400,
        alt: 'Og Image Alt Video Title C'
      },
      {
        url: 'https://www.test.ie/og-image-video-title-04.jpg',
        width: 400,
        height: 400,
        alt: 'Og Image Alt Video Title D'
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

<h1>Video SEO</h1>
<Links />
