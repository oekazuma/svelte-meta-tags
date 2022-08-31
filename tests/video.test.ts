import { test, expect } from '@playwright/test';

test('Video SEO loads correctly', async ({ page }) => {
  await page.goto('/video');
  await expect(page.locator('h1')).toContainText('Video SEO');
  await expect(page.locator('head title')).toContainText('Video Page Title | Svelte Meta Tags');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description of video page');
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'video.movie');
  await expect(page.locator('head meta[property="video:duration"]')).toHaveAttribute('content', '680000');
  await expect(page.locator('head meta[property="video:release_date"]')).toHaveAttribute(
    'content',
    '2022-12-21T22:04:11Z'
  );
  const videoActor = page.locator('head meta[property="video:actor"]');
  await expect(videoActor).toHaveCount(2);
  await expect(videoActor.nth(0)).toHaveAttribute('content', 'https://www.example.com/actors/@firstnameA-lastnameA');
  await expect(videoActor.nth(1)).toHaveAttribute('content', 'https://www.example.com/actors/@firstnameB-lastnameB');
  const videoActorRole = page.locator('head meta[property="video:actor:role"]');
  await expect(videoActorRole).toHaveCount(2);
  await expect(videoActorRole.nth(0)).toHaveAttribute('content', 'Protagonist');
  await expect(videoActorRole.nth(1)).toHaveAttribute('content', 'Antagonist');
  const videoDirector = page.locator('head meta[property="video:director"]');
  await expect(videoDirector).toHaveCount(2);
  await expect(videoDirector.nth(0)).toHaveAttribute(
    'content',
    'https://www.example.com/directors/@firstnameA-lastnameA'
  );
  await expect(videoDirector.nth(1)).toHaveAttribute(
    'content',
    'https://www.example.com/directors/@firstnameB-lastnameB'
  );
  const videoWriter = page.locator('head meta[property="video:writer"]');
  await expect(videoWriter).toHaveCount(2);
  await expect(videoWriter.nth(0)).toHaveAttribute('content', 'https://www.example.com/writers/@firstnameA-lastnameA');
  await expect(videoWriter.nth(1)).toHaveAttribute('content', 'https://www.example.com/writers/@firstnameB-lastnameB');
  const videoTag = page.locator('head meta[property="video:tag"]');
  await expect(videoTag).toHaveCount(3);
  await expect(videoTag.nth(0)).toHaveAttribute('content', 'Tag A');
  await expect(videoTag.nth(1)).toHaveAttribute('content', 'Tag B');
  await expect(videoTag.nth(2)).toHaveAttribute('content', 'Tag C');
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://www.example.com/videos/video-title'
  );
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', 'Open Graph Video Title');
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Description of open graph video'
  );
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(4);
  await expect(ogImage.nth(0)).toHaveAttribute('content', 'https://www.test.ie/og-image-video-title-01.jpg');
  await expect(ogImage.nth(1)).toHaveAttribute('content', 'https://www.test.ie/og-image-video-title-02.jpg');
  await expect(ogImage.nth(2)).toHaveAttribute('content', 'https://www.test.ie/og-image-video-title-03.jpg');
  await expect(ogImage.nth(3)).toHaveAttribute('content', 'https://www.test.ie/og-image-video-title-04.jpg');
  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(4);
  await expect(ogImageAlt.nth(0)).toHaveAttribute('content', 'Og Image Alt Video Title A');
  await expect(ogImageAlt.nth(1)).toHaveAttribute('content', 'Og Image Alt Video Title B');
  await expect(ogImageAlt.nth(2)).toHaveAttribute('content', 'Og Image Alt Video Title C');
  await expect(ogImageAlt.nth(3)).toHaveAttribute('content', 'Og Image Alt Video Title D');
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
  await expect(page.locator('head meta[name="twitter:creator"]')).toHaveAttribute('content', '@handle');
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
});
