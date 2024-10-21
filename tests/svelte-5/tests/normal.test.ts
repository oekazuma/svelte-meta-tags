import { test, expect } from '@playwright/test';

test('Normal SEO loads correctly', async ({ page, baseURL }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Normal | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Normal SEO');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description');
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://www.canonical.ie/');
  await expect(page.locator('head meta[name="keywords"]')).toHaveAttribute('content', 'first keyword, second keyword');
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
  const ogImageType = page.locator('head meta[property="og:image:type"]');
  await expect(ogImageType).toHaveCount(1);
  await expect(ogImageType).toHaveAttribute('content', 'image/jpeg');
  const ogImageSecureUrl = page.locator('head meta[property="og:image:secure_url"]');
  await expect(ogImageSecureUrl).toHaveCount(1);
  await expect(ogImageSecureUrl).toHaveAttribute('content', 'https://www.example.ie/og-image.jpg');
  const ogVideo = page.locator('head meta[property="og:video"]');
  await expect(ogVideo).toHaveCount(1);
  await expect(ogVideo).toHaveAttribute('content', 'https://www.example.ie/og-video.mp4');
  const ogVideoWidth = page.locator('head meta[property="og:video:width"]');
  await expect(ogVideoWidth).toHaveCount(1);
  await expect(ogVideoWidth).toHaveAttribute('content', '800');
  const ogVideoHeight = page.locator('head meta[property="og:video:height"]');
  await expect(ogVideoHeight).toHaveCount(1);
  await expect(ogVideoHeight).toHaveAttribute('content', '600');
  const ogVideoSecureUrl = page.locator('head meta[property="og:video:secure_url"]');
  await expect(ogVideoSecureUrl).toHaveCount(1);
  await expect(ogVideoSecureUrl).toHaveAttribute('content', 'https://www.example.ie/og-video.mp4');
  const ogVideoType = page.locator('head meta[property="og:video:type"]');
  await expect(ogVideoType).toHaveCount(1);
  await expect(ogVideoType).toHaveAttribute('content', 'video/mp4');
  const ogAudio = page.locator('head meta[property="og:audio"]');
  await expect(ogAudio).toHaveCount(1);
  await expect(ogAudio).toHaveAttribute('content', 'https://www.example.ie/og-audio.mp3');
  const ogAudioSecureUrl = page.locator('head meta[property="og:audio:secure_url"]');
  await expect(ogAudioSecureUrl).toHaveCount(1);
  await expect(ogAudioSecureUrl).toHaveAttribute('content', 'https://www.example.ie/og-audio.mp3');
  const ogAudioType = page.locator('head meta[property="og:audio:type"]');
  await expect(ogAudioType).toHaveCount(1);
  await expect(ogAudioType).toHaveAttribute('content', 'audio/mp3');
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
