import { test, expect } from '@playwright/test';

test('openGraph.image is rendered as the first og:image and prepended to openGraph.images', async ({ page }) => {
  await page.goto('/openGraphImage');

  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(2);
  await expect(ogImage.nth(0)).toHaveAttribute('content', 'https://www.example.ie/og-image-primary.jpg');
  await expect(ogImage.nth(1)).toHaveAttribute('content', 'https://www.example.ie/og-image-second.jpg');

  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(2);
  await expect(ogImageAlt.nth(0)).toHaveAttribute('content', 'Primary image');
  await expect(ogImageAlt.nth(1)).toHaveAttribute('content', 'Second image');

  const ogImageWidth = page.locator('head meta[property="og:image:width"]');
  await expect(ogImageWidth).toHaveCount(2);
  await expect(ogImageWidth.nth(0)).toHaveAttribute('content', '1200');
  await expect(ogImageWidth.nth(1)).toHaveAttribute('content', '800');

  const ogImageHeight = page.locator('head meta[property="og:image:height"]');
  await expect(ogImageHeight).toHaveCount(2);
  await expect(ogImageHeight.nth(0)).toHaveAttribute('content', '630');
  await expect(ogImageHeight.nth(1)).toHaveAttribute('content', '600');

  const ogImageSecureUrl = page.locator('head meta[property="og:image:secure_url"]');
  await expect(ogImageSecureUrl).toHaveCount(1);
  await expect(ogImageSecureUrl).toHaveAttribute('content', 'https://www.example.ie/og-image-primary.jpg');

  const ogImageType = page.locator('head meta[property="og:image:type"]');
  await expect(ogImageType).toHaveCount(1);
  await expect(ogImageType).toHaveAttribute('content', 'image/jpeg');
});
