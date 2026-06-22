import { test, expect } from '@playwright/test';

test('SearchAction type test page', async ({ page }) => {
  await page.goto('/searchActionType', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle(/SearchAction Type Test/);

  await expect(page.getByRole('heading', { name: 'SearchAction Type Test' })).toBeVisible();

  const jsonLdScript = page.locator('script[type="application/ld+json"]');
  await expect(jsonLdScript).toBeAttached();

  const scriptContent = await jsonLdScript.textContent();
  expect(scriptContent).not.toBeNull();
  expect(scriptContent?.trim()).not.toBe('');
  const jsonData = JSON.parse(scriptContent as string);

  expect(jsonData['@context']).toBe('https://schema.org');
  expect(jsonData['@type']).toBe('WebSite');
  expect(jsonData.name).toBe('Example Website');
  expect(jsonData.url).toBe('https://example.com');
  expect(jsonData.potentialAction['@type']).toBe('SearchAction');
  expect(jsonData.potentialAction.target).toBe('https://example.com/search?q={search_term_string}');
  expect(jsonData.potentialAction['query-input']).toBe('required name=search_term_string');
});
