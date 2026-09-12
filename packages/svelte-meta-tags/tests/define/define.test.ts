import { expect, test } from 'vitest';
import { defineBaseMetaTags, definePageMetaTags } from '$lib/define';

test('define helpers namespace the props under the expected key and freeze them', () => {
  // Separate inputs so one helper freezing its object cannot mask the other helper not freezing
  const baseProps = { title: 'Test Title', description: 'Test description' };
  const pageProps = { title: 'Test Title', description: 'Test description' };
  const { baseMetaTags } = defineBaseMetaTags(baseProps);
  const { pageMetaTags } = definePageMetaTags(pageProps);

  expect(baseMetaTags).toEqual(baseProps);
  expect(pageMetaTags).toEqual(pageProps);
  expect(Object.isFrozen(baseMetaTags)).toBe(true);
  expect(Object.isFrozen(pageMetaTags)).toBe(true);
});
