import { describe, expect, test } from 'vitest';
import MetaTags from '$lib/MetaTags.svelte';
import { metaContent, metaContents, metaTags, renderHead } from '../helpers/head';

describe('openGraph fallbacks', () => {
  test('renders nothing when the openGraph prop is absent', () => {
    const rendered = renderHead(MetaTags, { title: 'Home', description: 'Description', canonical: 'https://a.test/' });

    expect(metaTags(rendered, 'og:title')).toHaveLength(0);
    expect(metaTags(rendered, 'og:url')).toHaveLength(0);
  });

  test('emits og tags under the property attribute, not name', () => {
    const [tag] = metaTags(renderHead(MetaTags, { openGraph: { title: 'OG Title' } }), 'og:title');

    expect(tag.attrs.property).toBe('og:title');
    expect(tag.attrs.name).toBeUndefined();
  });

  test('og:title falls back to the templated title', () => {
    const rendered = renderHead(MetaTags, { title: 'Home', titleTemplate: '%s | MySite', openGraph: {} });

    expect(metaContent(rendered, 'og:title')).toBe('Home | MySite');
  });

  test('og:description falls back to description', () => {
    const rendered = renderHead(MetaTags, { description: 'Page Description', openGraph: {} });

    expect(metaContent(rendered, 'og:description')).toBe('Page Description');
  });

  test('og:url falls back to canonical', () => {
    const rendered = renderHead(MetaTags, { canonical: 'https://a.test/page', openGraph: {} });

    expect(metaContent(rendered, 'og:url')).toBe('https://a.test/page');
  });

  test('explicit openGraph values win over the fallbacks', () => {
    const rendered = renderHead(MetaTags, {
      title: 'Page Title',
      description: 'Page Description',
      canonical: 'https://a.test/page',
      openGraph: { title: 'OG Title', description: 'OG Description', url: 'https://a.test/og' }
    });

    expect(metaContent(rendered, 'og:title')).toBe('OG Title');
    expect(metaContent(rendered, 'og:description')).toBe('OG Description');
    expect(metaContent(rendered, 'og:url')).toBe('https://a.test/og');
  });

  test('lowercases og:type', () => {
    expect(metaContent(renderHead(MetaTags, { openGraph: { type: 'Website' } }), 'og:type')).toBe('website');
  });
});

describe('openGraph images', () => {
  test('renders every field of an image', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        images: [
          {
            url: 'https://a.test/og.jpg',
            alt: 'Og Image Alt',
            width: 800,
            height: 600,
            secureUrl: 'https://a.test/og.jpg',
            type: 'image/jpeg'
          }
        ]
      }
    });

    expect(metaContent(rendered, 'og:image')).toBe('https://a.test/og.jpg');
    expect(metaContent(rendered, 'og:image:alt')).toBe('Og Image Alt');
    expect(metaContent(rendered, 'og:image:width')).toBe('800');
    expect(metaContent(rendered, 'og:image:height')).toBe('600');
    expect(metaContent(rendered, 'og:image:secure_url')).toBe('https://a.test/og.jpg');
    expect(metaContent(rendered, 'og:image:type')).toBe('image/jpeg');
  });

  test('image (singular) is prepended to images', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        image: { url: 'https://a.test/primary.jpg', alt: 'Primary image' },
        images: [{ url: 'https://a.test/second.jpg', alt: 'Second image' }]
      }
    });

    expect(metaContents(rendered, 'og:image')).toEqual(['https://a.test/primary.jpg', 'https://a.test/second.jpg']);
    expect(metaContents(rendered, 'og:image:alt')).toEqual(['Primary image', 'Second image']);
  });

  test('image alone renders as a single og:image', () => {
    const rendered = renderHead(MetaTags, { openGraph: { image: { url: 'https://a.test/only.jpg' } } });

    expect(metaContents(rendered, 'og:image')).toEqual(['https://a.test/only.jpg']);
  });

  test('renders no og:image when neither is set', () => {
    expect(metaTags(renderHead(MetaTags, { openGraph: { title: 'OG' } }), 'og:image')).toHaveLength(0);
  });
});

describe('openGraph videos and audio', () => {
  test('renders every field of a video', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        videos: [
          {
            url: 'https://a.test/og.mp4',
            width: 800,
            height: 600,
            secureUrl: 'https://a.test/og.mp4',
            type: 'video/mp4'
          }
        ]
      }
    });

    expect(metaContent(rendered, 'og:video')).toBe('https://a.test/og.mp4');
    expect(metaContent(rendered, 'og:video:width')).toBe('800');
    expect(metaContent(rendered, 'og:video:height')).toBe('600');
    expect(metaContent(rendered, 'og:video:secure_url')).toBe('https://a.test/og.mp4');
    expect(metaContent(rendered, 'og:video:type')).toBe('video/mp4');
  });

  test('renders every field of an audio entry', () => {
    const rendered = renderHead(MetaTags, {
      openGraph: {
        audio: [{ url: 'https://a.test/og.mp3', secureUrl: 'https://a.test/og.mp3', type: 'audio/mp3' }]
      }
    });

    expect(metaContent(rendered, 'og:audio')).toBe('https://a.test/og.mp3');
    expect(metaContent(rendered, 'og:audio:secure_url')).toBe('https://a.test/og.mp3');
    expect(metaContent(rendered, 'og:audio:type')).toBe('audio/mp3');
  });

  test('renders locale and siteName', () => {
    const rendered = renderHead(MetaTags, { openGraph: { locale: 'en_IE', siteName: 'SiteName' } });

    expect(metaContent(rendered, 'og:locale')).toBe('en_IE');
    expect(metaContent(rendered, 'og:site_name')).toBe('SiteName');
  });
});

describe('facebook', () => {
  test('renders fb:app_id when appId is set', () => {
    expect(metaContent(renderHead(MetaTags, { facebook: { appId: '1234567890' } }), 'fb:app_id')).toBe('1234567890');
  });

  test('renders no fb:app_id when facebook is an empty object', () => {
    expect(metaTags(renderHead(MetaTags, { facebook: {} }), 'fb:app_id')).toHaveLength(0);
  });
});
