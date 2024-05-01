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
});
