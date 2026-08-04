import { describe, expect, test } from 'vitest';
import MetaTags from '$lib/MetaTags.svelte';
import { links, metaContent, metaTags, renderHead } from '../helpers/head';

describe('standard tags', () => {
  test('renders description, canonical and keywords', () => {
    const rendered = renderHead(MetaTags, {
      description: 'Description',
      canonical: 'https://a.test/',
      keywords: ['first keyword', 'second keyword']
    });

    expect(metaContent(rendered, 'description')).toBe('Description');
    expect(links(rendered, 'canonical')[0].attrs.href).toBe('https://a.test/');
    expect(metaContent(rendered, 'keywords')).toBe('first keyword, second keyword');
  });

  test('renders no keywords tag for an empty array', () => {
    expect(metaTags(renderHead(MetaTags, { keywords: [] }), 'keywords')).toHaveLength(0);
  });

  test('escapes values that would otherwise break out of the attribute', () => {
    const rendered = renderHead(MetaTags, { description: 'He said "hi" & <left>' });

    expect(metaContent(rendered, 'description')).toBe('He said "hi" & <left>');
    expect(rendered.html).not.toContain('<left>');
  });
});

describe('alternates', () => {
  test('renders the mobile alternate', () => {
    const rendered = renderHead(MetaTags, {
      mobileAlternate: { media: 'only screen and (max-width: 640px)', href: 'https://m.a.test/' }
    });

    const [alternate] = links(rendered, 'alternate');

    expect(alternate.attrs.media).toBe('only screen and (max-width: 640px)');
    expect(alternate.attrs.href).toBe('https://m.a.test/');
  });

  test('renders one alternate per language', () => {
    const rendered = renderHead(MetaTags, {
      languageAlternates: [
        { hrefLang: 'de-AT', href: 'https://de.a.test/' },
        { hrefLang: 'fr-FR', href: 'https://fr.a.test/' }
      ]
    });

    expect(links(rendered, 'alternate').map((link) => link.attrs.hreflang)).toEqual(['de-AT', 'fr-FR']);
  });
});

describe('additionalMetaTags', () => {
  test('renders a name/content pair', () => {
    const rendered = renderHead(MetaTags, {
      additionalMetaTags: [{ name: 'application-name', content: 'SvelteMetaTags' }]
    });

    expect(metaContent(rendered, 'application-name')).toBe('SvelteMetaTags');
  });

  test('renders a property/content pair', () => {
    const rendered = renderHead(MetaTags, {
      additionalMetaTags: [{ property: 'dc:creator', content: 'Jane Doe' }]
    });

    expect(metaContent(rendered, 'dc:creator')).toBe('Jane Doe');
  });

  test('emits httpEquiv as the http-equiv attribute', () => {
    const rendered = renderHead(MetaTags, {
      additionalMetaTags: [{ httpEquiv: 'x-ua-compatible', content: 'IE=edge; chrome=1' }]
    });

    const [tag] = rendered.tags.filter((candidate) => candidate.attrs['http-equiv'] !== undefined);

    expect(tag.attrs['http-equiv']).toBe('x-ua-compatible');
    expect(tag.attrs.content).toBe('IE=edge; chrome=1');
    expect(tag.attrs.httpEquiv).toBeUndefined();
  });
});

describe('additionalLinkTags', () => {
  test('renders arbitrary link tags in order', () => {
    const rendered = renderHead(MetaTags, {
      additionalLinkTags: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/touch-76.png', sizes: '76x76' },
        { rel: 'apple-touch-icon', href: '/touch-120.png', sizes: '120x120' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#193860' }
      ]
    });

    expect(links(rendered, 'icon')[0].attrs.href).toBe('/favicon.ico');
    expect(links(rendered, 'apple-touch-icon').map((link) => link.attrs.sizes)).toEqual(['76x76', '120x120']);
    expect(links(rendered, 'mask-icon')[0].attrs.color).toBe('#193860');
  });
});
