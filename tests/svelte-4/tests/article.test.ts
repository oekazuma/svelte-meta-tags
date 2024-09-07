import { test, expect } from '@playwright/test';

test('Article SEO loads correctly', async ({ page }) => {
  await page.goto('/article');
  await expect(page).toHaveTitle('Article Page Title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Article SEO');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description of article page');
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
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://www.example.com/articles/article-title'
  );
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', 'Open Graph Article Title');
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Description of open graph article'
  );
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(4);
  await expect(ogImage.nth(0)).toHaveAttribute('content', 'https://www.test.ie/og-image-article-title-01.jpg');
  await expect(ogImage.nth(1)).toHaveAttribute('content', 'https://www.test.ie/og-image-article-title-02.jpg');
  await expect(ogImage.nth(2)).toHaveAttribute('content', 'https://www.test.ie/og-image-article-title-03.jpg');
  await expect(ogImage.nth(3)).toHaveAttribute('content', 'https://www.test.ie/og-image-article-title-04.jpg');
  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(4);
  await expect(ogImageAlt.nth(0)).toHaveAttribute('content', 'Og Image Alt Article Title A');
  await expect(ogImageAlt.nth(1)).toHaveAttribute('content', 'Og Image Alt Article Title B');
  await expect(ogImageAlt.nth(2)).toHaveAttribute('content', 'Og Image Alt Article Title C');
  await expect(ogImageAlt.nth(3)).toHaveAttribute('content', 'Og Image Alt Article Title D');
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
