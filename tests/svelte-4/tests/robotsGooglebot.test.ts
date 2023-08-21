import { test, expect } from '@playwright/test';

test('Googlebot Robots props SEO applied correctly', async ({ page }) => {
  await page.goto('/robots/googlebot');
  await expect(page).toHaveTitle('Googlebot Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Googlebot Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('head meta[name="googlebot"]')).toHaveAttribute('content', 'index,follow');
});
