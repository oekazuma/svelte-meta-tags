<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Video Other Page Title | Svelte Meta Tags"
  description="Description of video other page"
  openGraph={{
    title: 'Open Graph Video Other Title',
    url: 'https://www.example.com/videos/video-other-title',
    type: 'video.other',
    video: {
      directors: ['https://www.example.com/directors/@firstnameA-lastnameA'],
      series: 'The Example Series'
    }
  }}
/>

<h1>Video Other SEO</h1>
