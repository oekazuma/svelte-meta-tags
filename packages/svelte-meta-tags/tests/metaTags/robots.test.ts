import { describe, expect, test } from 'vitest';
import MetaTags from '$lib/MetaTags.svelte';
import { metaContent, metaTags, renderHead } from '../helpers/head';

describe('robots', () => {
  test('defaults to index,follow when nothing is passed', () => {
    expect(metaContent(renderHead(MetaTags, {}), 'robots')).toBe('index,follow');
  });

  test('uses the supplied directive', () => {
    expect(metaContent(renderHead(MetaTags, { robots: 'noindex,nofollow' }), 'robots')).toBe('noindex,nofollow');
  });

  test('suppresses the tag entirely when robots is false', () => {
    expect(metaTags(renderHead(MetaTags, { robots: false }), 'robots')).toHaveLength(0);
  });

  test('appends every additional prop in a fixed order', () => {
    const rendered = renderHead(MetaTags, {
      additionalRobotsProps: {
        nosnippet: true,
        notranslate: true,
        noimageindex: true,
        noarchive: true,
        unavailableAfter: '2030-12-31',
        maxSnippet: -1,
        maxImagePreview: 'none',
        maxVideoPreview: -1
      }
    });

    expect(metaContent(rendered, 'robots')).toBe(
      'index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,unavailable_after:2030-12-31,noimageindex,max-video-preview:-1,notranslate'
    );
  });

  test('omits props that are not set', () => {
    const rendered = renderHead(MetaTags, { additionalRobotsProps: { noarchive: true, maxImagePreview: 'large' } });

    expect(metaContent(rendered, 'robots')).toBe('index,follow,max-image-preview:large,noarchive');
  });

  test('appends additional props to a custom directive', () => {
    const rendered = renderHead(MetaTags, { robots: 'noindex', additionalRobotsProps: { nosnippet: true } });

    expect(metaContent(rendered, 'robots')).toBe('noindex,nosnippet');
  });

  test('drops falsy numeric props — max-snippet:0 is currently unreachable', () => {
    const rendered = renderHead(MetaTags, { additionalRobotsProps: { maxSnippet: 0, maxVideoPreview: 0 } });

    expect(metaContent(rendered, 'robots')).toBe('index,follow');
  });

  test('boolean props set to false are omitted', () => {
    const rendered = renderHead(MetaTags, { additionalRobotsProps: { nosnippet: false, noarchive: true } });

    expect(metaContent(rendered, 'robots')).toBe('index,follow,noarchive');
  });
});
