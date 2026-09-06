import { test } from 'vitest';
import { deepMerge } from '$lib/deepMerge';

test('deepMerge with simple objects', async ({ bench }) => {
  await bench('simple objects', () => {
    deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 });
  }).run();
});

test('deepMerge with nested objects', async ({ bench }) => {
  await bench('nested objects', () => {
    deepMerge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 }, e: 3 } });
  }).run();
});

test('deepMerge with arrays', async ({ bench }) => {
  await bench('arrays', () => {
    deepMerge({ a: [1, 2], b: 1 }, { a: [3, 4], c: 2 });
  }).run();
});

test('deepMerge with null values', async ({ bench }) => {
  await bench('null values', () => {
    deepMerge({ a: null }, { b: 2 });
  }).run();
});

test('deepMerge with undefined values', async ({ bench }) => {
  await bench('undefined values', () => {
    deepMerge({ a: undefined, b: 1 }, { a: 2 });
  }).run();
});

test('deepMerge with special types (Date, Function)', async ({ bench }) => {
  await bench('special types (Date, Function)', () => {
    const date = new Date();
    const func = () => {};
    deepMerge({ a: date }, { b: func });
  }).run();
});

test('deepMerge with scalar values', async ({ bench }) => {
  await bench('scalar values', () => {
    deepMerge({ a: 10, b: 'hello' }, { b: 'world', c: true });
  }).run();
});

test('deepMerge with different types at the same key level', async ({ bench }) => {
  await bench('different types at the same key level', () => {
    deepMerge({ a: { b: [1, 2] } }, { a: { b: { c: 3 } } });
  }).run();
});

test('deepMerge with nested arrays', async ({ bench }) => {
  await bench('nested arrays', () => {
    deepMerge({ a: [[1, 2]], b: 1 }, { a: [[3, 4]], c: 2 });
  }).run();
});
