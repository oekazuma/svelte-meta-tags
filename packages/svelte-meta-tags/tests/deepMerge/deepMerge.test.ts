import { describe, expect, test } from 'vitest';
import { deepMerge } from '$lib/deepMerge';

describe('deepMerge', () => {
  test('merges nested objects recursively without mutating either input', () => {
    const target: Record<string, unknown> = { a: 1, b: { c: 2, d: 3, e: { f: 1 } } };
    const source: Record<string, unknown> = { b: { d: 4, e: { g: 2 } }, h: 5 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 1, b: { c: 2, d: 4, e: { f: 1, g: 2 } }, h: 5 });
    expect(target).toEqual({ a: 1, b: { c: 2, d: 3, e: { f: 1 } } });
    expect(source).toEqual({ b: { d: 4, e: { g: 2 } }, h: 5 });
  });

  test('replaces arrays instead of concatenating', () => {
    expect(deepMerge({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] });
  });

  test('source wins when types differ at the same key', () => {
    expect(deepMerge({ a: 1, b: { c: [1] } }, { a: { x: 1 }, b: { c: { d: 2 } } })).toEqual({
      a: { x: 1 },
      b: { c: { d: 2 } }
    });
  });

  test('undefined source value keeps the target value', () => {
    expect(deepMerge({ a: 1, b: 2 }, { a: undefined })).toEqual({ a: 1, b: 2 });
  });

  test('returns the other side when one input is null/undefined, and {} when both are', () => {
    expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 });
    expect(deepMerge(null, undefined)).toEqual({});
  });

  test('target Date/function wins over the source value at the same key', () => {
    const date = new Date('2020-01-01');
    const func = () => {};
    const result = deepMerge({ a: date, b: func }, { a: 5, b: 5 });
    expect(result.a).toBe(date);
    expect(result.b).toBe(func);
  });

  test('source Date/function wins over a plain target value', () => {
    const date = new Date('2021-06-15');
    const func = () => {};
    const result = deepMerge({ a: 5, b: 5 }, { a: date, b: func });
    expect(result.a).toBe(date);
    expect(result.b).toBe(func);
  });

  test('skips __proto__, constructor and prototype keys from the source', () => {
    const source = JSON.parse(
      '{"__proto__": {"polluted": true}, "constructor": {"x": 1}, "prototype": {"y": 2}, "a": 1}'
    );
    const result = deepMerge({ b: 2 }, source);
    expect(result).toEqual({ a: 1, b: 2 });
    expect((result as Record<string, unknown>).polluted).toBeUndefined();
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
  });
});
