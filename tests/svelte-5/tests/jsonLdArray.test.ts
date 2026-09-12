import { test, expect } from '@playwright/test';

test('JSON-LD array schema renders a single script with @context on every entry', async ({ page }) => {
  await page.goto('/jsonldArray', { waitUntil: 'domcontentloaded' });
  expect(await page.locator('script[type="application/ld+json"]').allTextContents()).toEqual([
    '[{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Books"}]},{"@context":"https://schema.org","@type":"NewsArticle","headline":"Article headline"}]'
  ]);
});
