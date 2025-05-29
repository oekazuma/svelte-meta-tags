import { test, expect } from '@playwright/test';

test('SearchAction with query-input loads correctly', async ({ page }) => {
  await page.goto('/searchAction');
  await expect(page).toHaveTitle('SearchAction Test | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('SearchAction Test');

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((list) => list.map((element) => element.textContent));

  expect(jsonLd[0]).toContain('"@type":"SearchAction"');
  expect(jsonLd[0]).toContain('"query-input":"required name=search_term_string"');

  expect(jsonLd[1]).toContain('"@type":"EntryPoint"');
  expect(jsonLd[1]).toContain('"form-input":"required name=form_data"');
  expect(jsonLd[1]).toContain('"form-output":"application/json"');
});
