import { test, expect } from '@playwright/test';

test('Profile SEO loads correctly', async ({ page }) => {
  await page.goto('/profile', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Profile Page Title | Svelte Meta Tags');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description of profile page');
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'profile');
  await expect(page.locator('head meta[property="profile:first_name"]')).toHaveAttribute('content', 'First');
  await expect(page.locator('head meta[property="profile:last_name"]')).toHaveAttribute('content', 'Last');
  await expect(page.locator('head meta[property="profile:username"]')).toHaveAttribute('content', 'firstlast123');
  await expect(page.locator('head meta[property="profile:gender"]')).toHaveAttribute('content', 'male');
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://www.example.com/@firstlast123'
  );
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', 'Open Graph Profile Title');
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Description of open graph profile'
  );
  await expect(page.locator('head meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/og-image-firstlast123-01.jpg'
  );
});
