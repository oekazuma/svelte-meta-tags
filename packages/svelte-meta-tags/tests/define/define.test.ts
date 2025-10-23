import { describe, expect, test } from 'vitest';
import { defineBaseMetaTags, definePageMetaTags } from '$lib/define';
import type { MetaTagsProps } from '$lib/types';

describe('defineBaseMetaTags and definePageMetaTags', () => {
  const sampleMetaTags: MetaTagsProps = {
    title: 'Test Title',
    description: 'Test description',
    canonical: 'https://example.com'
  };

  test('should create frozen readonly object', () => {
    const { baseMetaTags } = defineBaseMetaTags(sampleMetaTags);
    const { pageMetaTags } = definePageMetaTags(sampleMetaTags);

    expect(baseMetaTags).toEqual(sampleMetaTags);
    expect(pageMetaTags).toEqual(sampleMetaTags);
    expect(Object.isFrozen(baseMetaTags)).toBe(true);
    expect(Object.isFrozen(pageMetaTags)).toBe(true);
  });

  test('should freeze the props to make them readonly', () => {
    const { baseMetaTags } = defineBaseMetaTags(sampleMetaTags);

    expect(Object.isFrozen(baseMetaTags)).toBe(true);

    // Should throw when trying to modify frozen object
    expect(() => {
      // @ts-expect-error - intentionally testing runtime mutation
      baseMetaTags.title = 'Modified';
    }).toThrow(TypeError);
  });

  test('should not modify the original input object', () => {
    const original = { ...sampleMetaTags };
    const { baseMetaTags } = defineBaseMetaTags(sampleMetaTags);

    expect(sampleMetaTags).toEqual(original);
    expect(baseMetaTags).toEqual(original);
  });

  test('should handle empty object', () => {
    const { baseMetaTags } = defineBaseMetaTags({});

    expect(baseMetaTags).toEqual({});
    expect(Object.isFrozen(baseMetaTags)).toBe(true);
  });

  test('should handle falsy values correctly', () => {
    const metaTagsWithFalsy: MetaTagsProps = {
      title: '',
      robots: false,
      keywords: []
    };

    const { pageMetaTags } = definePageMetaTags(metaTagsWithFalsy);

    expect(pageMetaTags.title).toBe('');
    expect(pageMetaTags.robots).toBe(false);
    expect(pageMetaTags.keywords).toEqual([]);
  });

  test('should support spreading for object merging', () => {
    const { baseMetaTags } = defineBaseMetaTags({
      title: 'Base Title',
      description: 'Base Description'
    });

    const { pageMetaTags } = definePageMetaTags({
      title: 'Page Title',
      canonical: 'https://example.com/page'
    });

    const combined = { ...baseMetaTags, ...pageMetaTags };

    expect(combined.title).toBe('Page Title'); // Page overrides base
    expect(combined.description).toBe('Base Description'); // From base
    expect(combined.canonical).toBe('https://example.com/page'); // From page
  });

  test('should handle complex nested objects', () => {
    const complexMetaTags: MetaTagsProps = {
      title: 'Complex Title',
      openGraph: {
        title: 'OG Title',
        images: [{ url: 'https://example.com/image.jpg' }]
      },
      additionalMetaTags: [{ name: 'viewport', content: 'width=device-width' }]
    };

    const { baseMetaTags } = defineBaseMetaTags(complexMetaTags);

    expect(baseMetaTags.openGraph?.images?.[0]?.url).toBe('https://example.com/image.jpg');
    expect(Object.isFrozen(baseMetaTags)).toBe(true);
  });

  test('both functions should behave identically', () => {
    const { baseMetaTags } = defineBaseMetaTags(sampleMetaTags);
    const { pageMetaTags } = definePageMetaTags(sampleMetaTags);

    expect(baseMetaTags).toEqual(pageMetaTags);
    expect(Object.isFrozen(baseMetaTags)).toBe(Object.isFrozen(pageMetaTags));
  });

  test('should clarify that freeze is shallow (nested objects remain mutable)', () => {
    const complexMetaTags: MetaTagsProps = {
      title: 'Complex Title',
      openGraph: {
        title: 'OG Title',
        images: [{ url: 'https://example.com/image.jpg' }]
      }
    };

    const { baseMetaTags } = defineBaseMetaTags(complexMetaTags);

    // Top level is frozen
    expect(Object.isFrozen(baseMetaTags)).toBe(true);

    // But nested objects are NOT frozen (limitation of Object.freeze)
    expect(Object.isFrozen(baseMetaTags.openGraph)).toBe(false);
    expect(Object.isFrozen(baseMetaTags.openGraph?.images)).toBe(false);

    // Nested objects can still be mutated
    if (baseMetaTags.openGraph) {
      baseMetaTags.openGraph.title = 'Modified OG Title'; // This works!
      expect(baseMetaTags.openGraph.title).toBe('Modified OG Title');
    }
  });
});
