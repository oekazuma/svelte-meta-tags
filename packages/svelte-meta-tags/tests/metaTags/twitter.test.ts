import { describe, expect, test } from 'vitest';
import MetaTags from '$lib/MetaTags.svelte';
import { metaContent, metaTags, renderHead } from '../helpers/head';

describe('twitter', () => {
  test('renders nothing when the twitter prop is absent', () => {
    const rendered = renderHead(MetaTags, { title: 'Home', description: 'Description' });

    expect(metaTags(rendered, 'twitter:title')).toHaveLength(0);
    expect(metaTags(rendered, 'twitter:description')).toHaveLength(0);
  });

  test('emits twitter tags under the name attribute, not property', () => {
    const [tag] = metaTags(renderHead(MetaTags, { twitter: { cardType: 'summary' } }), 'twitter:card');

    expect(tag.attrs.name).toBe('twitter:card');
    expect(tag.attrs.property).toBeUndefined();
  });

  test('stringifies numeric player dimensions', () => {
    const rendered = renderHead(MetaTags, { twitter: { playerWidth: 435, playerHeight: 251 } });

    expect(metaContent(rendered, 'twitter:player:width')).toBe('435');
    expect(metaContent(rendered, 'twitter:player:height')).toBe('251');
  });

  test('renders the full app card surface', () => {
    const rendered = renderHead(MetaTags, {
      twitter: {
        cardType: 'app',
        appNameIphone: 'App iPhone',
        appIdIphone: '111',
        appUrlIphone: 'https://example.com/iphone',
        appNameIpad: 'App iPad',
        appIdIpad: '222',
        appUrlIpad: 'https://example.com/ipad',
        appNameGoogleplay: 'App Play',
        appIdGoogleplay: '333',
        appUrlGoogleplay: 'https://example.com/play'
      }
    });

    expect(metaContent(rendered, 'twitter:app:name:iphone')).toBe('App iPhone');
    expect(metaContent(rendered, 'twitter:app:id:ipad')).toBe('222');
    expect(metaContent(rendered, 'twitter:app:url:googleplay')).toBe('https://example.com/play');
  });
});

describe('twitter fallback chain', () => {
  test('falls back to OpenGraph values', () => {
    const rendered = renderHead(MetaTags, {
      title: 'Page Title',
      description: 'Page Description',
      twitter: { cardType: 'summary_large_image', site: '@site' },
      openGraph: { title: 'OG Title', description: 'OG Description' }
    });

    expect(metaContent(rendered, 'twitter:title')).toBe('OG Title');
    expect(metaContent(rendered, 'twitter:description')).toBe('OG Description');
  });

  test('falls back to the standard values when OpenGraph is absent', () => {
    const rendered = renderHead(MetaTags, {
      title: 'Page Title',
      description: 'Page Description',
      twitter: { cardType: 'summary' }
    });

    expect(metaContent(rendered, 'twitter:title')).toBe('Page Title');
    expect(metaContent(rendered, 'twitter:description')).toBe('Page Description');
  });

  test('explicit twitter values win over both fallbacks', () => {
    const rendered = renderHead(MetaTags, {
      title: 'Page Title',
      description: 'Page Description',
      twitter: { title: 'Twitter Title', description: 'Twitter Description' },
      openGraph: { title: 'OG Title', description: 'OG Description' }
    });

    expect(metaContent(rendered, 'twitter:title')).toBe('Twitter Title');
    expect(metaContent(rendered, 'twitter:description')).toBe('Twitter Description');
  });

  test('falls back independently per field', () => {
    const rendered = renderHead(MetaTags, {
      title: 'Page Title',
      description: 'Page Description',
      twitter: { cardType: 'summary' },
      openGraph: { title: 'OG Title' }
    });

    expect(metaContent(rendered, 'twitter:title')).toBe('OG Title');
    expect(metaContent(rendered, 'twitter:description')).toBe('Page Description');
  });

  test('the title fallback uses the templated title', () => {
    const rendered = renderHead(MetaTags, {
      title: 'Home',
      titleTemplate: '%s | MySite',
      description: 'Page Description',
      twitter: { cardType: 'summary' }
    });

    expect(metaContent(rendered, 'twitter:title')).toBe('Home | MySite');
  });
});
