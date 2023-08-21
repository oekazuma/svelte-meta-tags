import { test, expect } from '@playwright/test';

test('Normal SEO loads correctly', async ({ page, baseURL }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Normal | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Normal SEO');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description');
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://www.canonical.ie/');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute('content', 'en_IE');
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', 'https://www.example.com/page');
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', 'Open Graph Title');
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Open Graph Description'
  );
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(1);
  await expect(ogImage).toHaveAttribute('content', 'https://www.example.ie/og-image.jpg');
  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(1);
  await expect(ogImageAlt).toHaveAttribute('content', 'Og Image Alt');
  const ogImageWidth = page.locator('head meta[property="og:image:width"]');
  await expect(ogImageWidth).toHaveCount(1);
  await expect(ogImageWidth).toHaveAttribute('content', '800');
  const ogImageHeight = page.locator('head meta[property="og:image:height"]');
  await expect(ogImageHeight).toHaveCount(1);
  await expect(ogImageHeight).toHaveAttribute('content', '600');
  await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute('content', 'SiteName');
  await expect(page.locator('head meta[property="fb:app_id"]')).toHaveAttribute('content', '1234567890');
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('head meta[name="twitter:site"]')).toHaveAttribute('content', '@site');
  await expect(page.locator('head meta[name="twitter:creator"]')).toHaveAttribute('content', '@handle');
  await expect(page.locator('head meta[name="twitter:creator"]')).toHaveAttribute('content', '@handle');
  await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', 'Normal | Svelte Meta Tags');
  await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute('content', 'Description');
  await expect(page.locator('head meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    'https://www.example.ie/twitter-image.jpg'
  );
  await expect(page.locator('head meta[name="twitter:image:alt"]')).toHaveAttribute('content', 'Twitter image alt');
  await expect(page.locator('head link[rel="icon"]')).toHaveAttribute('href', `${baseURL}/favicon.ico`);
  const appleTouchIcon = page.locator('head link[rel="apple-touch-icon"]');
  await expect(appleTouchIcon).toHaveCount(2);
  await expect(appleTouchIcon.nth(0)).toHaveAttribute('sizes', '76x76');
  await expect(appleTouchIcon.nth(1)).toHaveAttribute('sizes', '120x120');
  const maskIcon = page.locator('head link[rel="mask-icon"]');
  await expect(maskIcon).toHaveAttribute('href', 'https://www.test.ie/safari-pinned-tab.svg');
  await expect(maskIcon).toHaveAttribute('color', '#193860');
  await expect(page.locator('head link[rel="manifest"]')).toHaveAttribute('href', 'https://www.test.ie/manifest.json');
});
