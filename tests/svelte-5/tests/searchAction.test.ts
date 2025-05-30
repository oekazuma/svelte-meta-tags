import { test, expect } from '@playwright/test';

test('SearchAction with query-input loads correctly', async ({ page }) => {
  await page.goto('/searchAction');
  await expect(page).toHaveTitle('SearchAction Test | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('SearchAction Test');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
    'content',
    'Test page for SearchAction with query-input'
  );
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'index,follow');

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((list) => list.map((element) => element.textContent));

  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(3);

  expect(jsonLd[0]).toEqual(
    '{"@context":"https://schema.org","@type":"SearchAction","target":"https://example.com/search?query={search_term_string}","query-input":"required name=search_term_string"}'
  );

  expect(jsonLd[1]).toEqual(
    '{"@context":"https://schema.org","@type":"EntryPoint","urlTemplate":"https://example.com/form","form-input":"required name=form_data","form-output":"application/json"}'
  );

  expect(jsonLd[2]).toEqual(
    '{"@context":"https://schema.org","@type":"WebSite","name":"Example Website","url":"https://example.com","potentialAction":{"@type":"SearchAction","target":"https://example.com/search?q={search_term_string}","query-input":"required name=search_term_string"}}'
  );

  expect(jsonLd[0]).toContain('"target":"https://example.com/search?query={search_term_string}"');
  expect(jsonLd[0]).toContain('"query-input":"required name=search_term_string"');

  expect(jsonLd[1]).toContain('"urlTemplate":"https://example.com/form"');
  expect(jsonLd[1]).toContain('"form-input":"required name=form_data"');
  expect(jsonLd[1]).toContain('"form-output":"application/json"');

  expect(jsonLd[2]).toContain('"@type":"WebSite"');
  expect(jsonLd[2]).toContain('"potentialAction"');
  expect(jsonLd[2]).toContain('"target":"https://example.com/search?q={search_term_string}"');
});
