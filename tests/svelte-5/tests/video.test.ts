import { test, expect } from '@playwright/test';

test('og:type=video.movie renders the video:* sub-block', async ({ page }) => {
  await page.goto('/video', { waitUntil: 'domcontentloaded' });
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
});
