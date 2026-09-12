import { test, expect } from '@playwright/test';

test('JSON-LD with output="body" renders in body, not head', async ({ page }) => {
  await page.goto('/jsonldBody', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head script[type="application/ld+json"]')).toHaveCount(0);
  const jsonLd = await page
    .locator('body script[type="application/ld+json"]')
    .evaluateAll((list) => list.map((element) => element.textContent));
  expect(jsonLd).toEqual(['{"@context":"https://schema.org","@type":"NewsArticle","headline":"Article headline"}']);
});
