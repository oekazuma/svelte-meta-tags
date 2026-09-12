import { test, expect } from '@playwright/test';

test('og:type=profile renders the profile:* sub-block', async ({ page }) => {
  await page.goto('/profile', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'profile');
  await expect(page.locator('head meta[property="profile:first_name"]')).toHaveAttribute('content', 'First');
  await expect(page.locator('head meta[property="profile:last_name"]')).toHaveAttribute('content', 'Last');
  await expect(page.locator('head meta[property="profile:username"]')).toHaveAttribute('content', 'firstlast123');
  await expect(page.locator('head meta[property="profile:gender"]')).toHaveAttribute('content', 'male');
});
