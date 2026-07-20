import { test, expect } from '@playwright/test';

test('Additional Robots props SEO applied correctly', async ({ page }) => {
  await page.goto('/additionalRobots', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Additional Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    'content',
    'index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,unavailable_after:2030-12-31,noimageindex,max-video-preview:-1,notranslate'
  );
});
