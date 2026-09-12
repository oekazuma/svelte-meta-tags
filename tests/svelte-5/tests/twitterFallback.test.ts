import { test, expect } from '@playwright/test';

test('explicit Twitter values win, missing ones fall back to OpenGraph per field', async ({ page }) => {
  await page.goto('/twitterFallback', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('head meta[name="twitter:site"]')).toHaveAttribute('content', '@site');
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'Twitter Title');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'OG Description');
});

test('Twitter title and description both fall back to OpenGraph before the page values', async ({ page }) => {
  await page.goto('/twitterFallbackOpenGraph', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'OG Title');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'OG Description');
});

test('Twitter falls back to the templated title and description when OpenGraph is absent', async ({ page }) => {
  await page.goto('/twitterFallbackTitle', { waitUntil: 'domcontentloaded' });
  // `$&` must be inserted literally, not treated as a String.replace pattern
  await expect(page).toHaveTitle('Rock $& Roll | MySite');
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'Rock $& Roll | MySite');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'Page Description');
});
