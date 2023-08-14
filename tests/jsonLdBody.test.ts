import { test, expect } from '@playwright/test';

test('JSON-LD Head SEO loads correctly', async ({ page }) => {
  await page.goto('/jsonldBody');
  await expect(page).toHaveTitle('JSON-LD Body Page Title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('JSON-LD Body SEO');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
    'content',
    'Description of JSON-LD Body page'
  );
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((list) => list.map((element) => element.textContent));
  expect(jsonLd[0]).toEqual(
    '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Books","item":"https://example.com/books"},{"@type":"ListItem","position":2,"name":"Science Fiction","item":"https://example.com/books/sciencefiction"},{"@type":"ListItem","position":3,"name":"Award Winners"}]}'
  );
  expect(jsonLd[1]).toEqual(
    '{"@context":"https://schema.org","@type":"NewsArticle","mainEntityOfPage":{"@type":"WebPage","@id":"https://google.com/article"},"headline":"Article headline","image":["https://example.com/photos/1x1/photo.jpg","https://example.com/photos/4x3/photo.jpg","https://example.com/photos/16x9/photo.jpg"],"datePublished":"2015-02-05T08:00:00+08:00","dateModified":"2015-02-05T09:20:00+08:00","author":{"@type":"Person","name":"John Doe"},"publisher":{"@type":"Organization","name":"Google","logo":{"@type":"ImageObject","url":"https://google.com/logo.jpg"}}}'
  );
});
