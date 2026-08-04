import { describe, expect, test } from 'vitest';
import { serializeRobots } from '$lib/robots';

describe('serializeRobots', () => {
  test('returns null when robots is false', () => {
    expect(serializeRobots(false, undefined)).toBeNull();
    expect(serializeRobots(false, { nosnippet: true })).toBeNull();
  });

  test('returns the directive unchanged when there are no additional props', () => {
    expect(serializeRobots('index,follow', undefined)).toBe('index,follow');
    expect(serializeRobots('noindex,nofollow', undefined)).toBe('noindex,nofollow');
  });

  test('returns the directive unchanged for an empty additional props object', () => {
    expect(serializeRobots('index,follow', {})).toBe('index,follow');
  });

  test('appends directives in the documented order regardless of key order', () => {
    expect(
      serializeRobots('index,follow', {
        notranslate: true,
        maxVideoPreview: -1,
        noimageindex: true,
        unavailableAfter: '2030-12-31',
        noarchive: true,
        maxImagePreview: 'none',
        maxSnippet: -1,
        nosnippet: true
      })
    ).toBe(
      'index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,unavailable_after:2030-12-31,noimageindex,max-video-preview:-1,notranslate'
    );
  });

  test('drops falsy values', () => {
    expect(serializeRobots('index,follow', { nosnippet: false, maxSnippet: 0, maxVideoPreview: 0 })).toBe(
      'index,follow'
    );
  });

  test('renders a tag for robots true', () => {
    expect(serializeRobots(true, undefined)).toBe('true');
  });
});
