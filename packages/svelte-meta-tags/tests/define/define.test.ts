import { expect, test } from 'vitest';
import { defineBaseMetaTags, definePageMetaTags } from '$lib/define';

test('define helpers namespace the props under the expected key and freeze them', () => {
  const props = { title: 'Test Title', description: 'Test description' };
  const { baseMetaTags } = defineBaseMetaTags(props);
  const { pageMetaTags } = definePageMetaTags(props);

  expect(baseMetaTags).toEqual(props);
  expect(pageMetaTags).toEqual(props);
  expect(Object.isFrozen(baseMetaTags)).toBe(true);
  expect(Object.isFrozen(pageMetaTags)).toBe(true);
});
