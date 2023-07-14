import { test, expect } from '@playwright/test';

test('Robots props SEO applied correctly', async ({ page }) => {
  await page.goto('/robots');
  await expect(page).toHaveTitle('Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    'content',
    'index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate'
  );
  await expect(page.locator('head meta[name="googlebot"]')).toHaveAttribute(
    'content',
    'index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate'
  );
});

test('Custom Robots SEO applied correctly', async ({ page }) => {
  await page.goto('/customRobots');
  await expect(page).toHaveTitle('Custom Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Custom Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex,nofollow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate'
  );
  await expect(page.locator('head meta[name="googlebot"]')).toHaveAttribute(
    'content',
    'noindex,nofollow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate'
  );
});

test('Disabled Robots SEO applied correctly', async ({ page }) => {
  await page.goto('/disabledRobots');
  await expect(page).toHaveTitle('Disabled Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Disabled Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).not.toBeAttached();
  await expect(page.locator('head meta[name="googlebot"]')).not.toBeAttached();
});
