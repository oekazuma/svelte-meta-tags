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
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);

    expect(baseResult).toEqual(sampleMetaTags);
    expect(pageResult).toEqual(sampleMetaTags);
    expect(Object.isFrozen(baseResult)).toBe(true);
    expect(Object.isFrozen(pageResult)).toBe(true);
  });

  test('should freeze the props to make them readonly', () => {
    const result = defineBaseMetaTags(sampleMetaTags);

    expect(Object.isFrozen(result)).toBe(true);

    // Should throw when trying to modify frozen object
    expect(() => {
      // @ts-expect-error - intentionally testing runtime mutation
      result.title = 'Modified';
    }).toThrow(TypeError);
  });

  test('should not modify the original input object', () => {
    const original = { ...sampleMetaTags };
    const result = defineBaseMetaTags(sampleMetaTags);

    expect(sampleMetaTags).toEqual(original);
    expect(result).toEqual(original);
  });

  test('should handle empty object', () => {
    const result = defineBaseMetaTags({});

    expect(result).toEqual({});
    expect(Object.isFrozen(result)).toBe(true);
  });

  test('should handle falsy values correctly', () => {
    const metaTagsWithFalsy: MetaTagsProps = {
      title: '',
      robots: false,
      keywords: []
    };

    const result = definePageMetaTags(metaTagsWithFalsy);

    expect(result.title).toBe('');
    expect(result.robots).toBe(false);
    expect(result.keywords).toEqual([]);
  });

  test('should support spreading for object merging', () => {
    const baseMeta = defineBaseMetaTags({
      title: 'Base Title',
      description: 'Base Description'
    });

    const pageMeta = definePageMetaTags({
      title: 'Page Title',
      canonical: 'https://example.com/page'
    });

    const combined = { ...baseMeta, ...pageMeta };

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

    const result = defineBaseMetaTags(complexMetaTags);

    expect(result).toEqual(complexMetaTags);
    expect(result.openGraph?.images?.[0]?.url).toBe('https://example.com/image.jpg');
    expect(Object.isFrozen(result)).toBe(true);
  });

  test('both functions should behave identically', () => {
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);

    expect(baseResult).toEqual(pageResult);
    expect(Object.isFrozen(baseResult)).toBe(Object.isFrozen(pageResult));
  });
});
