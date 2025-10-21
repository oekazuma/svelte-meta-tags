import { describe, expect, test } from 'vitest';
import { defineBaseMetaTags, definePageMetaTags } from '$lib/define';
import type { MetaTagsProps } from '$lib/types';

describe('define functions core functionality', () => {
  const sampleMetaTags: MetaTagsProps = {
    title: 'Test Title',
    description: 'Test description',
    canonical: 'https://example.com'
  };

  test('should create readonly wrapper with props getter', () => {
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);
    
    expect(baseResult.props).toEqual(sampleMetaTags);
    expect(pageResult.props).toEqual(sampleMetaTags);
    expect(typeof baseResult.props).toBe('object');
    expect(typeof pageResult.props).toBe('object');
  });

  test('should freeze the input object to make it readonly', () => {
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);
    
    expect(Object.isFrozen(baseResult.props)).toBe(true);
    expect(Object.isFrozen(pageResult.props)).toBe(true);
  });

  test('should not modify the original input object', () => {
    const original = { ...sampleMetaTags };
    
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);
    
    expect(sampleMetaTags).toEqual(original);
    expect(baseResult.props).toEqual(original);
    expect(pageResult.props).toEqual(original);
  });

  test('should handle empty object', () => {
    const empty: MetaTagsProps = {};
    
    const baseResult = defineBaseMetaTags(empty);
    const pageResult = definePageMetaTags(empty);
    
    expect(baseResult.props).toEqual({});
    expect(pageResult.props).toEqual({});
    expect(Object.isFrozen(baseResult.props)).toBe(true);
    expect(Object.isFrozen(pageResult.props)).toBe(true);
  });

  test('both functions should produce identical results', () => {
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);
    
    expect(baseResult.props).toEqual(pageResult.props);
    expect(Object.isFrozen(baseResult.props)).toBe(Object.isFrozen(pageResult.props));
  });
});

describe('object independence and reference handling', () => {
  test('multiple calls should create independent objects', () => {
    const metaTags: MetaTagsProps = { title: 'Test' };
    
    const result1 = defineBaseMetaTags(metaTags);
    const result2 = defineBaseMetaTags(metaTags);
    
    // Different instances but same content
    expect(result1).not.toBe(result2);
    expect(result1.props).toEqual(result2.props);
    expect(result1.props).toBe(result2.props); // Same frozen object reference
  });

  test('should handle object with nested structures', () => {
    const complexMetaTags: MetaTagsProps = {
      title: 'Complex Title',
      openGraph: {
        title: 'OG Title',
        images: [{ url: 'https://example.com/image.jpg' }]
      },
      additionalMetaTags: [
        { name: 'viewport', content: 'width=device-width' }
      ]
    };

    const result = defineBaseMetaTags(complexMetaTags);
    
    expect(result.props).toEqual(complexMetaTags);
    expect(result.props.openGraph?.images?.[0]?.url).toBe('https://example.com/image.jpg');
    expect(Object.isFrozen(result.props)).toBe(true);
  });

  test('should preserve object references after freezing', () => {
    const nestedObject = { title: 'Nested' };
    const metaTags: MetaTagsProps = {
      title: 'Main Title',
      openGraph: nestedObject
    };

    const result = defineBaseMetaTags(metaTags);
    
    expect(result.props.openGraph).toBe(nestedObject);
    expect(Object.isFrozen(result.props)).toBe(true);
  });
});

describe('edge cases and type handling', () => {
  test('should handle all MetaTagsProps properties', () => {
    const fullMetaTags: MetaTagsProps = {
      title: 'Full Title',
      titleTemplate: '%s | Site',
      description: 'Description',
      canonical: 'https://example.com',
      robots: 'index,follow',
      additionalRobotsProps: { nosnippet: true },
      mobileAlternate: { media: 'screen', href: '/mobile' },
      languageAlternates: [{ hrefLang: 'en', href: '/en' }],
      twitter: { cardType: 'summary' },
      facebook: { appId: '123' },
      openGraph: { type: 'website' },
      additionalMetaTags: [{ name: 'test', content: 'value' }],
      additionalLinkTags: [{ rel: 'icon', href: '/favicon.ico' }],
      keywords: ['test', 'meta']
    };

    const result = defineBaseMetaTags(fullMetaTags);
    
    expect(result.props).toEqual(fullMetaTags);
    expect(Object.keys(result.props)).toHaveLength(Object.keys(fullMetaTags).length);
  });

  test('should handle falsy values correctly', () => {
    const metaTagsWithFalsy: MetaTagsProps = {
      title: '',
      description: '',
      robots: false,
      keywords: []
    };

    const result = definePageMetaTags(metaTagsWithFalsy);
    
    expect(result.props).toEqual(metaTagsWithFalsy);
    expect(result.props.title).toBe('');
    expect(result.props.robots).toBe(false);
    expect(result.props.keywords).toEqual([]);
  });
});

describe('usage patterns as documented', () => {
  test('should support direct props access pattern', () => {
    const metaTags: MetaTagsProps = {
      title: 'Direct Access Test',
      description: 'Testing direct access'
    };

    const result = defineBaseMetaTags(metaTags);
    
    // Granular access pattern
    const title = result.props.title;
    const description = result.props.description;
    
    expect(title).toBe('Direct Access Test');
    expect(description).toBe('Testing direct access');
  });

  test('should support spreadable pattern in object creation', () => {
    const baseMetaTags: MetaTagsProps = {
      title: 'Base Title',
      description: 'Base Description'
    };

    const pageMetaTags: MetaTagsProps = {
      title: 'Page Title',
      canonical: 'https://example.com/page'
    };

    const base = defineBaseMetaTags(baseMetaTags);
    const page = definePageMetaTags(pageMetaTags);
    
    // Simulating spreading in real usage
    const combined = {
      ...base.props,
      ...page.props
    };
    
    expect(combined.title).toBe('Page Title'); // Page overrides base
    expect(combined.description).toBe('Base Description'); // From base
    expect(combined.canonical).toBe('https://example.com/page'); // From page
  });

  test('should maintain immutability in combined usage', () => {
    const base = defineBaseMetaTags({ title: 'Base' });
    const page = definePageMetaTags({ title: 'Page' });
    
    const combined = { ...base.props, ...page.props };
    
    // Original objects should remain unchanged
    expect(base.props.title).toBe('Base');
    expect(page.props.title).toBe('Page');
    expect(combined.title).toBe('Page');
  });
});