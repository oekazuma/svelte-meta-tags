import { test, expect } from '@playwright/test';

test('fb:app_id is not rendered when facebook.appId is missing', async ({ page }) => {
  await page.goto('/facebookNoAppId', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Facebook No AppId | Svelte Meta Tags');
  await expect(page.locator('head meta[property="fb:app_id"]')).toHaveCount(0);
});
