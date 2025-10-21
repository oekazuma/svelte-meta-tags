import { describe, expect, test } from 'vitest';
import { defineBaseMetaTags, definePageMetaTags } from '$lib/define';
import type { MetaTagsProps } from '$lib/types';

describe('defineBaseMetaTags and definePageMetaTags', () => {
  const sampleMetaTags: MetaTagsProps = {
    title: 'Test Title',
    description: 'Test description',
    canonical: 'https://example.com'
  };

  test('should create wrapper with props getter', () => {
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);

    expect(baseResult.props).toEqual(sampleMetaTags);
    expect(pageResult.props).toEqual(sampleMetaTags);
  });

  test('should freeze the props to make them readonly', () => {
    const result = defineBaseMetaTags(sampleMetaTags);

    expect(Object.isFrozen(result.props)).toBe(true);

    // Should throw when trying to modify frozen object
    expect(() => {
      // @ts-expect-error - intentionally testing runtime mutation
      result.props.title = 'Modified';
    }).toThrow(TypeError);
  });

  test('should not modify the original input object', () => {
    const original = { ...sampleMetaTags };
    const result = defineBaseMetaTags(sampleMetaTags);

    expect(sampleMetaTags).toEqual(original);
    expect(result.props).toEqual(original);
  });

  test('should handle empty object', () => {
    const result = defineBaseMetaTags({});

    expect(result.props).toEqual({});
    expect(Object.isFrozen(result.props)).toBe(true);
  });

  test('should handle falsy values correctly', () => {
    const metaTagsWithFalsy: MetaTagsProps = {
      title: '',
      robots: false,
      keywords: []
    };

    const result = definePageMetaTags(metaTagsWithFalsy);

    expect(result.props.title).toBe('');
    expect(result.props.robots).toBe(false);
    expect(result.props.keywords).toEqual([]);
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

    const combined = { ...baseMeta.props, ...pageMeta.props };

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

    expect(result.props).toEqual(complexMetaTags);
    expect(result.props.openGraph?.images?.[0]?.url).toBe('https://example.com/image.jpg');
    expect(Object.isFrozen(result.props)).toBe(true);
  });

  test('both functions should behave identically', () => {
    const baseResult = defineBaseMetaTags(sampleMetaTags);
    const pageResult = definePageMetaTags(sampleMetaTags);

    expect(baseResult.props).toEqual(pageResult.props);
    expect(Object.isFrozen(baseResult.props)).toBe(Object.isFrozen(pageResult.props));
  });
});
