import { test, expect } from '@playwright/test';

test('JSON-LD is not rendered when schema is omitted', async ({ page }) => {
  await page.goto('/jsonldEmpty', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('JSON-LD Empty Page Title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('JSON-LD Empty SEO');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
});
