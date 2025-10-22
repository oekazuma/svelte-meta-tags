import { defineBaseMetaTags } from 'svelte-meta-tags';

export const load = ({ url }) => {
  const baseTags = defineBaseMetaTags({
    title: 'Normal',
    titleTemplate: '%s | Svelte Meta Tags',
    description: 'Svelte Meta Tags is a Svelte component for managing meta tags and SEO in your Svelte applications.',
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: 'website',
      url: new URL(url.pathname, url.origin).href,
      locale: 'en_IE',
      title: 'Open Graph Title',
      description: 'Open Graph Description',
      siteName: 'SiteName',
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
      ]
    }
  });

  return { ...baseTags };
};
