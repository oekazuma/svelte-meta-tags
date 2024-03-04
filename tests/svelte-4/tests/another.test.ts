import { test, expect } from '@playwright/test';

test('Another pattern SEO loads correctly', async ({ page }) => {
  await page.goto('/another');
  await expect(page).toHaveTitle('');
  await expect(page.locator('h1')).toContainText('Another SEO');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description Another');
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://www.canonical.ie/another');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  await expect(page.locator('head meta[name="googlebot"]')).toHaveAttribute('content', 'noindex,nofollow');
  const alternate = page.locator('head link[rel="alternate"]');
  await expect(alternate).toHaveCount(2);
  await expect(alternate.nth(0)).toHaveAttribute('media', 'only screen and (max-width: 640px)');
  await expect(alternate.nth(0)).toHaveAttribute('href', 'https://m.canonical.ie');
  await expect(alternate.nth(1)).toHaveAttribute('href', 'https://www.canonical.ie/de');
  await expect(alternate.nth(1)).toHaveAttribute('hreflang', 'de-AT');
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', 'https://www.url.ie/another');
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', 'Open Graph Title Another');
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Open Graph Description Another'
  );
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(2);
  await expect(ogImage.nth(0)).toHaveAttribute('content', 'https://www.test.ie/og-image-another-01.jpg');
  await expect(ogImage.nth(1)).toHaveAttribute('content', 'https://www.test.ie/og-image-another-02.jpg');
  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(2);
  await expect(ogImageAlt.nth(0)).toHaveAttribute('content', 'Og Image Alt Another');
  await expect(ogImageAlt.nth(1)).toHaveAttribute('content', 'Og Image Alt Another Second');
  const ogImageWidth = page.locator('head meta[property="og:image:width"]');
  await expect(ogImageWidth).toHaveCount(2);
  await expect(ogImageWidth.nth(0)).toHaveAttribute('content', '850');
  await expect(ogImageWidth.nth(1)).toHaveAttribute('content', '950');
  const ogImageHeight = page.locator('head meta[property="og:image:height"]');
  await expect(ogImageHeight).toHaveCount(2);
  await expect(ogImageHeight.nth(0)).toHaveAttribute('content', '650');
  await expect(ogImageHeight.nth(1)).toHaveAttribute('content', '850');
  await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute('content', 'SiteName Another');
  await expect(page.locator('head meta[property="dc:creator"]')).toHaveAttribute('content', 'Jane Doe');
  await expect(page.locator('head meta[name="application-name"]')).toHaveAttribute('content', 'Svelte-Meta-Tags');
  await expect(page.locator('head meta[http-equiv="x-ua-compatible"]')).toHaveAttribute('content', 'IE=edge; chrome=1');
});
