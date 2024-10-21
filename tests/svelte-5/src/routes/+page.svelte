<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Normal"
  titleTemplate="%s | Svelte Meta Tags"
  description="Description"
  canonical="https://www.canonical.ie/"
  keywords={['first keyword', 'second keyword']}
  openGraph={{
    type: 'website',
    url: 'https://www.example.com/page',
    locale: 'en_IE',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image.jpg',
        alt: 'Og Image Alt',
        width: 800,
        height: 600,
        secureUrl: 'https://www.example.ie/og-image.jpg',
        type: 'image/jpeg'
      }
    ],
    videos: [
      {
        url: 'https://www.example.ie/og-video.mp4',
        width: 800,
        height: 600,
        secureUrl: 'https://www.example.ie/og-video.mp4',
        type: 'video/mp4'
      }
    ],
    audio: [
      {
        url: 'https://www.example.ie/og-audio.mp3',
        secureUrl: 'https://www.example.ie/og-audio.mp3',
        type: 'audio/mp3'
      }
    ],
    siteName: 'SiteName'
  }}
  twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Normal | Svelte Meta Tags',
    description: 'Description',
    image: 'https://www.example.ie/twitter-image.jpg',
    imageAlt: 'Twitter image alt'
  }}
  facebook={{
    appId: '1234567890'
  }}
  additionalLinkTags={[
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: 'https://www.test.ie/touch-icon-ipad.jpg',
      sizes: '76x76'
    },
    {
      rel: 'apple-touch-icon',
      href: 'https://www.test.ie/touch-icon-iphone-retina.jpg',
      sizes: '120x120'
    },
    {
      rel: 'mask-icon',
      href: 'https://www.test.ie/safari-pinned-tab.svg',
      color: '#193860'
    },
    {
      rel: 'manifest',
      href: 'https://www.test.ie/manifest.json'
    }
  ]}
/>

<h1>Normal SEO</h1>
