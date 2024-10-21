import { test, expect } from '@playwright/test';

test('Robots props SEO applied correctly', async ({ page }) => {
  await page.goto('/robots');
  await expect(page).toHaveTitle('Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
});
