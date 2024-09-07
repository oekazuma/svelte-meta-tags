import { test, expect } from '@playwright/test';

test('Profile SEO loads correctly', async ({ page }) => {
  await page.goto('/profile');
  await expect(page).toHaveTitle('Profile Page Title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Profile SEO');
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
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(4);
  await expect(ogImage.nth(0)).toHaveAttribute('content', 'https://www.test.ie/og-image-firstlast123-01.jpg');
  await expect(ogImage.nth(1)).toHaveAttribute('content', 'https://www.test.ie/og-image-firstlast123-02.jpg');
  await expect(ogImage.nth(2)).toHaveAttribute('content', 'https://www.test.ie/og-image-firstlast123-03.jpg');
  await expect(ogImage.nth(3)).toHaveAttribute('content', 'https://www.test.ie/og-image-firstlast123-04.jpg');
  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(4);
  await expect(ogImageAlt.nth(0)).toHaveAttribute('content', 'Og Image Alt firstlast123 A');
  await expect(ogImageAlt.nth(1)).toHaveAttribute('content', 'Og Image Alt firstlast123 B');
  await expect(ogImageAlt.nth(2)).toHaveAttribute('content', 'Og Image Alt firstlast123 C');
  await expect(ogImageAlt.nth(3)).toHaveAttribute('content', 'Og Image Alt firstlast123 D');
  const ogImageWidth = page.locator('head meta[property="og:image:width"]');
  await expect(ogImageWidth).toHaveCount(4);
  await expect(ogImageWidth.nth(0)).toHaveAttribute('content', '850');
  await expect(ogImageWidth.nth(1)).toHaveAttribute('content', '950');
  await expect(ogImageWidth.nth(2)).toHaveAttribute('content', '600');
  await expect(ogImageWidth.nth(3)).toHaveAttribute('content', '400');
  const ogImageHeight = page.locator('head meta[property="og:image:height"]');
  await expect(ogImageHeight).toHaveCount(4);
  await expect(ogImageHeight.nth(0)).toHaveAttribute('content', '650');
  await expect(ogImageHeight.nth(1)).toHaveAttribute('content', '850');
  await expect(ogImageHeight.nth(2)).toHaveAttribute('content', '400');
  await expect(ogImageHeight.nth(3)).toHaveAttribute('content', '400');
  await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute('content', 'SiteName');
  await expect(page.locator('head meta[name="twitter:site"]')).toHaveAttribute('content', '@site');
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
});
