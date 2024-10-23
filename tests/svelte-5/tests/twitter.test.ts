import { test, expect } from '@playwright/test';

test('MetaTags component renders correct meta tags for Twitter', async ({ page }) => {
  await page.goto('/twitter');
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('head meta[name="twitter:site"]')).toHaveAttribute('content', '@site');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'twitter test');
  await expect(page.locator('head meta[name="twitter:creator"]')).toHaveAttribute('content', '@handle');
  await expect(page.locator('head meta[name="twitter:creator:id"]')).toHaveAttribute('content', '1234567890');
  await expect(page.locator('head meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/og-image-book-title-01.jpg'
  );
  await expect(page.locator('head meta[name="twitter:image:alt"]')).toHaveAttribute('content', 'book');

  await expect(page.locator('head meta[name="twitter:player"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/sample-image.jpg'
  );
  await expect(page.locator('head meta[name="twitter:player:width"]')).toHaveAttribute('content', '100');
  await expect(page.locator('head meta[name="twitter:player:height"]')).toHaveAttribute('content', '100');
  await expect(page.locator('head meta[name="twitter:player:stream"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/sample.mp4'
  );

  await expect(page.locator('head meta[name="twitter:app:id:iphone"]')).toHaveAttribute('content', '12345');
  await expect(page.locator('head meta[name="twitter:app:url:iphone"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/og-image-book-title-01.jpg'
  );

  await expect(page.locator('head meta[name="twitter:app:id:ipad"]')).toHaveAttribute('content', '12345');
  await expect(page.locator('head meta[name="twitter:app:url:ipad"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/og-image-book-title-01.jpg'
  );

  await expect(page.locator('head meta[name="twitter:app:id:googleplay"]')).toHaveAttribute('content', 'com.meta.tags');
  await expect(page.locator('head meta[name="twitter:app:url:googleplay"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/og-image-book-title-01.jpg'
  );
});
