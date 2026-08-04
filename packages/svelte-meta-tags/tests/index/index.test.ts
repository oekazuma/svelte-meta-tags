import { describe, expect, test } from 'vitest';
import * as publicApi from '$lib/index';

/**
 * The published entry point is the library's interface. Anything added here is
 * a public API change and needs a changeset; anything removed is a breaking one.
 */
describe('public exports', () => {
  test('exports exactly the documented runtime surface', () => {
    expect(Object.keys(publicApi).sort()).toEqual([
      'JsonLd',
      'MetaTags',
      'deepMerge',
      'defineBaseMetaTags',
      'definePageMetaTags'
    ]);
  });

  test('components are exported as components', () => {
    expect(typeof publicApi.MetaTags).toBe('function');
    expect(typeof publicApi.JsonLd).toBe('function');
  });

  test('helpers are exported as functions', () => {
    expect(typeof publicApi.deepMerge).toBe('function');
    expect(typeof publicApi.defineBaseMetaTags).toBe('function');
    expect(typeof publicApi.definePageMetaTags).toBe('function');
  });

  test('internal modules stay internal', () => {
    expect(publicApi).not.toHaveProperty('serializeRobots');
    expect(publicApi).not.toHaveProperty('ROBOTS_CONFLICT_WARNING');
  });
});
