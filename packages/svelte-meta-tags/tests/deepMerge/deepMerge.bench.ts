import { bench } from 'vitest';
import { deepMerge } from '$lib/deepMerge';

bench('deepMerge with simple objects', () => {
  deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 });
});

bench('deepMerge with nested objects', () => {
  deepMerge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 }, e: 3 } });
});

bench('deepMerge with arrays', () => {
  deepMerge({ a: [1, 2], b: 1 }, { a: [3, 4], c: 2 });
});

bench('deepMerge with null values', () => {
  deepMerge({ a: null }, { b: 2 });
});

bench('deepMerge with undefined values', () => {
  deepMerge({ a: undefined, b: 1 }, { a: 2 });
});

bench('deepMerge with special types (Date, Function)', () => {
  const date = new Date();
  const func = () => {};
  deepMerge({ a: date }, { b: func });
});

bench('deepMerge with scalar values', () => {
  deepMerge({ a: 10, b: 'hello' }, { b: 'world', c: true });
});

bench('deepMerge with different types at the same key level', () => {
  deepMerge({ a: { b: [1, 2] } }, { a: { b: { c: 3 } } });
});

bench('deepMerge with nested arrays', () => {
  deepMerge({ a: [[1, 2]], b: 1 }, { a: [[3, 4]], c: 2 });
});
