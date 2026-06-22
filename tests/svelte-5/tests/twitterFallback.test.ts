import { test, expect } from '@playwright/test';

test('Twitter metadata falls back to OpenGraph values when not explicitly set', async ({ page }) => {
  await page.goto('/twitterFallback', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('head meta[name="twitter:site"]')).toHaveAttribute('content', '@site');
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'OG Title');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'OG Description');
});

test('Twitter metadata falls back to standard meta values when OG is also not set', async ({ page }) => {
  await page.goto('/twitterFallbackTitle', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'Page Title');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'Page Description');
});

test('Twitter metadata uses explicit values over fallbacks', async ({ page }) => {
  await page.goto('/twitterFallbackExplicit', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'Twitter Title');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'Twitter Description');
});

test('Twitter metadata falls back independently per field (mixed fallback)', async ({ page }) => {
  await page.goto('/twitterFallbackMixed', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'OG Title');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'Page Description');
});

test('Twitter title fallback uses titleTemplate-applied title', async ({ page }) => {
  await page.goto('/twitterFallbackTemplate', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'Home | MySite');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'Page Description');
});
