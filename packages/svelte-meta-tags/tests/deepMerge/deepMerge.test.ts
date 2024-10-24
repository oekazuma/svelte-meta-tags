import { describe, expect, test } from 'vitest';
import { deepMerge } from '$lib/deepMerge';

describe('deepMerge functionality', () => {
  test('whether two objects are deeply merged without affecting the original object', () => {
    const result = deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 });
    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    expect({ a: 1, b: { c: 2 } }).toEqual({ a: 1, b: { c: 2 } });
    expect({ b: { d: 3 }, e: 4 }).toEqual({ b: { d: 3 }, e: 4 });
  });

  test('deep merge with multi-level nested objects', () => {
    const result = deepMerge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 }, e: 3 } });
    expect(result).toEqual({ a: { b: { c: 1, d: 2 }, e: 3 } });
  });

  test('correct merge for nested objects', () => {
    const result = deepMerge({ x: { y: 1 } }, { x: { z: 2 } });
    expect(result).toEqual({ x: { y: 1, z: 2 } });
  });

  test('deep merge of objects containing arrays', () => {
    const result = deepMerge({ a: [1, 2], b: 1 }, { a: [3, 4], c: 2 });
    expect(result).toEqual({ a: [3, 4], b: 1, c: 2 });
  });

  test('handling of null values', () => {
    const result = deepMerge({ a: null }, { b: 2 });
    expect(result).toEqual({ a: null, b: 2 });
  });

  test('merge of objects containing undefined values', () => {
    const result = deepMerge({ a: undefined, b: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2, b: 1 });
  });

  test('empty objects do not affect the merge', () => {
    const result = deepMerge({ a: 1 }, {});
    expect(result).toEqual({ a: 1 });
  });

  test('when properties have different types in the objects being merged', () => {
    const result = deepMerge({ a: 1 }, { a: { b: 2 } });
    expect(result).toEqual({ a: { b: 2 } });
  });

  test('handling of special object types like Date and Function', () => {
    const date = new Date();
    const func = () => {};

    const result = deepMerge({ a: date }, { b: func });
    expect(result.a).toEqual(date);
    expect(result.b).toEqual(func);
  });

  test('merging with scalar values (number, string, boolean)', () => {
    const result = deepMerge({ a: 10, b: 'hello' }, { b: 'world', c: true });
    expect(result).toEqual({ a: 10, b: 'world', c: true });
  });

  test('deep merge when overrides are missing keys present in initial', () => {
    const result = deepMerge({ a: 1, b: { c: 2, d: 3 } }, { b: { d: 4 } });
    expect(result).toEqual({ a: 1, b: { c: 2, d: 4 } });
  });

  test('merging deep structures with different types at the same key level', () => {
    const result = deepMerge({ a: { b: [1, 2] } }, { a: { b: { c: 3 } } });
    expect(result).toEqual({ a: { b: { c: 3 } } });
  });

  test('handling of nested arrays', () => {
    const result = deepMerge({ a: [[1, 2]], b: 1 }, { a: [[3, 4]], c: 2 });
    expect(result).toEqual({ a: [[3, 4]], b: 1, c: 2 });
  });

  test('merging objects with identical nested structure', () => {
    const result = deepMerge({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } });
    expect(result).toEqual({ a: { b: { c: 2 } } });
  });

  test('merging with undefined in both initial and override', () => {
    const result = deepMerge({ a: undefined }, { a: undefined });
    expect(result).toEqual({ a: undefined });
  });

  test('merging with functions in deep structures', () => {
    const func = () => {};
    const result = deepMerge({ a: { b: func } }, { a: { c: 1 } });
    expect(result).toEqual({ a: { b: func, c: 1 } });
  });
});
