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
      additionalMetaTags: [{ name: 'viewport', content: 'width=device-width' }]
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

  test('should support spreading wrapper properties for merging meta tags', () => {
    const baseMetaTags: MetaTagsProps = {
      title: 'Base App Title',
      description: 'Base app description',
      canonical: 'https://example.com'
    };

    const pageMetaTags: MetaTagsProps = {
      title: 'Specific Page Title',
      canonical: 'https://example.com/specific-page'
    };

    const base = defineBaseMetaTags(baseMetaTags);
    const page = definePageMetaTags(pageMetaTags);

    // Merging props from both wrappers (documented pattern)
    const combined = { ...base.props, ...page.props };

    // Should have props from both wrappers, with page overriding base
    expect(combined.title).toBe('Specific Page Title'); // Page overrides base
    expect(combined.description).toBe('Base app description'); // From base (not overridden)
    expect(combined.canonical).toBe('https://example.com/specific-page'); // Page overrides base

    // Original wrappers should remain unchanged
    expect(base.props.title).toBe('Base App Title');
    expect(base.props.description).toBe('Base app description');
    expect(base.props.canonical).toBe('https://example.com');
    expect(page.props.title).toBe('Specific Page Title');
    expect(page.props.canonical).toBe('https://example.com/specific-page');
    expect(page.props.description).toBeUndefined(); // Page didn't define description
  });

  test('should handle complex merging scenarios with multiple properties', () => {
    const base = defineBaseMetaTags({
      title: 'Site Default',
      description: 'Default site description',
      robots: 'index,follow',
      openGraph: {
        type: 'website',
        siteName: 'My Site'
      },
      twitter: {
        cardType: 'summary'
      }
    });

    const page = definePageMetaTags({
      title: 'Article Title',
      canonical: 'https://example.com/article',
      openGraph: {
        type: 'article',
        title: 'OG Article Title'
      },
      additionalMetaTags: [{ name: 'article:author', content: 'John Doe' }]
    });

    const combined = { ...base.props, ...page.props };

    // Verify override semantics
    expect(combined.title).toBe('Article Title');
    expect(combined.description).toBe('Default site description');
    expect(combined.canonical).toBe('https://example.com/article');
    expect(combined.robots).toBe('index,follow');

    // OpenGraph should be overridden completely by page
    expect(combined.openGraph?.type).toBe('article');
    expect(combined.openGraph?.title).toBe('OG Article Title');
    expect(combined.openGraph?.siteName).toBeUndefined(); // Not preserved from base

    // Twitter from base should be preserved
    expect(combined.twitter?.cardType).toBe('summary');

    // Additional meta tags from page should be present
    expect(combined.additionalMetaTags).toHaveLength(1);
    expect(combined.additionalMetaTags?.[0]?.name).toBe('article:author');

    // Verify immutability - original wrappers unchanged
    expect(base.props.title).toBe('Site Default');
    expect(base.props.openGraph?.siteName).toBe('My Site');
    expect(page.props.description).toBeUndefined();
    expect(page.props.robots).toBeUndefined();
  });

  test('should preserve wrapper functionality after property spreading', () => {
    const base = defineBaseMetaTags({
      title: 'Base Title',
      description: 'Base Description'
    });
    const page = definePageMetaTags({
      title: 'Page Title',
      canonical: 'https://example.com'
    });

    // Create combined meta tags by spreading props
    const combinedMetaTags = { ...base.props, ...page.props };

    // Verify combined result has correct override semantics
    expect(combinedMetaTags.title).toBe('Page Title'); // Page overrides base
    expect(combinedMetaTags.description).toBe('Base Description'); // From base
    expect(combinedMetaTags.canonical).toBe('https://example.com'); // From page

    // Original wrappers should still be functional and unchanged
    expect(base.props.title).toBe('Base Title');
    expect(base.props.description).toBe('Base Description');
    expect(base.props.canonical).toBeUndefined();

    expect(page.props.title).toBe('Page Title');
    expect(page.props.canonical).toBe('https://example.com');
    expect(page.props.description).toBeUndefined();

    // Verify immutability is maintained
    expect(Object.isFrozen(base.props)).toBe(true);
    expect(Object.isFrozen(page.props)).toBe(true);
  });

  test('should support creating new wrappers with combined meta tags', () => {
    const base = defineBaseMetaTags({
      title: 'Base',
      description: 'Base description'
    });

    const page = definePageMetaTags({
      title: 'Page',
      canonical: 'https://example.com/page'
    });

    // Combine and create new wrapper
    const combinedMetaTags = { ...base.props, ...page.props };
    const newWrapper = definePageMetaTags(combinedMetaTags);

    // New wrapper should contain merged properties
    expect(newWrapper.props.title).toBe('Page');
    expect(newWrapper.props.description).toBe('Base description');
    expect(newWrapper.props.canonical).toBe('https://example.com/page');

    // Original wrappers should remain unchanged
    expect(base.props.title).toBe('Base');
    expect(page.props.title).toBe('Page');
    expect(base.props.canonical).toBeUndefined();
    expect(page.props.description).toBeUndefined();

    // All should be immutable
    expect(Object.isFrozen(base.props)).toBe(true);
    expect(Object.isFrozen(page.props)).toBe(true);
    expect(Object.isFrozen(newWrapper.props)).toBe(true);
  });

  test('should yield empty object when spreading wrapper itself (not .props)', () => {
    const metaTags: MetaTagsProps = {
      title: 'Test Title',
      description: 'Test description'
    };

    const base = defineBaseMetaTags(metaTags);
    const page = definePageMetaTags(metaTags);

    // Spreading the wrapper itself should yield empty object
    const spreadBase = { ...base };
    const spreadPage = { ...page };

    // Wrappers are not enumerable, only .props contains the actual meta tags
    expect(Object.keys(spreadBase).length).toBe(0);
    expect(Object.keys(spreadPage).length).toBe(0);
    expect(spreadBase).toEqual({});
    expect(spreadPage).toEqual({});

    // Verify .props must be used for actual meta tag data
    expect(base.props).toEqual(metaTags);
    expect(page.props).toEqual(metaTags);
  });

  test('should enforce immutability at runtime for frozen props', () => {
    const metaTags: MetaTagsProps = {
      title: 'Original Title',
      description: 'Original description'
    };

    const base = defineBaseMetaTags(metaTags);
    const page = definePageMetaTags(metaTags);

    // Verify properties are frozen
    expect(Object.isFrozen(base.props)).toBe(true);
    expect(Object.isFrozen(page.props)).toBe(true);

    // Test runtime behavior in strict mode - should throw TypeError
    expect(() => {
      // @ts-expect-error - intentionally testing runtime mutation
      base.props.title = 'Modified Title';
    }).toThrow(TypeError);

    expect(() => {
      // @ts-expect-error - intentionally testing runtime mutation
      page.props.description = 'Modified Description';
    }).toThrow(TypeError);

    // Verify properties remain unchanged after attempted mutation
    expect(base.props.title).toBe('Original Title');
    expect(page.props.description).toBe('Original description');

    // Test that new property assignment also throws
    expect(() => {
      // @ts-expect-error - intentionally testing runtime mutation
      base.props.newProperty = 'Should not work';
    }).toThrow(TypeError);

    // Verify object structure remains intact
    expect(base.props).toEqual(metaTags);
    expect(page.props).toEqual(metaTags);
  });
});
