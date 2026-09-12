import { test, expect } from '@playwright/test';

test('JSON-LD renders one head script per component with @context injected', async ({ page }) => {
  await page.goto('/jsonldHead', { waitUntil: 'domcontentloaded' });
  const jsonLd = await page
    .locator('head script[type="application/ld+json"]')
    .evaluateAll((list) => list.map((element) => element.textContent));
  expect(jsonLd).toEqual([
    '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Books"}]}',
    '{"@context":"https://schema.org","@type":"NewsArticle","headline":"Article headline"}'
  ]);
});
