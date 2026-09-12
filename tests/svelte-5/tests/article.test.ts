import { test, expect } from '@playwright/test';

test('og:type=article renders the article:* sub-block', async ({ page }) => {
  await page.goto('/article', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('head meta[property="article:published_time"]')).toHaveAttribute(
    'content',
    '2017-06-21T23:04:13Z'
  );
  await expect(page.locator('head meta[property="article:modified_time"]')).toHaveAttribute(
    'content',
    '2018-01-21T18:04:43Z'
  );
  await expect(page.locator('head meta[property="article:expiration_time"]')).toHaveAttribute(
    'content',
    '2022-12-21T22:04:11Z'
  );
  const articleAuthor = page.locator('head meta[property="article:author"]');
  await expect(articleAuthor).toHaveCount(2);
  await expect(articleAuthor.nth(0)).toHaveAttribute(
    'content',
    'https://www.example.com/authors/@firstnameA-lastnameA'
  );
  await expect(articleAuthor.nth(1)).toHaveAttribute(
    'content',
    'https://www.example.com/authors/@firstnameB-lastnameB'
  );
  await expect(page.locator('head meta[property="article:section"]')).toHaveAttribute('content', 'Section II');
  const articleTag = page.locator('head meta[property="article:tag"]');
  await expect(articleTag).toHaveCount(3);
  await expect(articleTag.nth(0)).toHaveAttribute('content', 'Tag A');
  await expect(articleTag.nth(1)).toHaveAttribute('content', 'Tag B');
  await expect(articleTag.nth(2)).toHaveAttribute('content', 'Tag C');
});
