import { test, expect } from '@playwright/test';

test('titleTemplate inserts titles containing replacement patterns literally', async ({ page }) => {
  await page.goto('/titleTemplateSpecialChars', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Rock $& Roll | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Title Template Special Chars SEO');
});
