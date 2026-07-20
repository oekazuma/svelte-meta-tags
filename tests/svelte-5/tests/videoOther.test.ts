import { test, expect } from '@playwright/test';

test('Video Other SEO loads correctly', async ({ page }) => {
  await page.goto('/videoOther', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Video Other Page Title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Video Other SEO');
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'video.other');
  await expect(page.locator('head meta[property="video:director"]')).toHaveAttribute(
    'content',
    'https://www.example.com/directors/@firstnameA-lastnameA'
  );
  await expect(page.locator('head meta[property="video:series"]')).toHaveAttribute('content', 'The Example Series');
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Open Graph Video Other Title'
  );
});
