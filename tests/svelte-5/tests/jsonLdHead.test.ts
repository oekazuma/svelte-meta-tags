import { test, expect } from '@playwright/test';

test('JSON-LD renders one head script per schema (@context injected once per object), none when schema is omitted', async ({
  page
}) => {
  await page.goto('/jsonldHead', { waitUntil: 'domcontentloaded' });
  expect(await page.locator('head script[type="application/ld+json"]').allTextContents()).toEqual([
    '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Books"}]}',
    '{"@context":"https://schema.org","@type":"NewsArticle","headline":"Article headline"}',
    '{"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList"},{"@type":"NewsArticle","headline":"Graph headline"}]}'
  ]);
});
