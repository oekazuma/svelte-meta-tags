<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    type: 'website',
    title: 'OG Image Alias',
    description: 'image alias test',
    image: {
      url: 'https://www.example.ie/og-image-primary.jpg',
      alt: 'Primary image',
      width: 1200,
      height: 630,
      secureUrl: 'https://www.example.ie/og-image-primary.jpg',
      type: 'image/jpeg'
    },
    images: [
      {
        url: 'https://www.example.ie/og-image-second.jpg',
        alt: 'Second image',
        width: 800,
        height: 600
      }
    ]
  }}
/>

<h1>OG Image Alias</h1>
