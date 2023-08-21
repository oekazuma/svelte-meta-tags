import { test, expect } from '@playwright/test';

test('Book SEO loads correctly', async ({ page }) => {
  await page.goto('/book');
  await expect(page).toHaveTitle('Book Page Title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Book SEO');
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Description of book page');
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'book');
  await expect(page.locator('head meta[property="book:release_date"]')).toHaveAttribute(
    'content',
    '2018-09-17T11:08:13Z'
  );
  const bookAuthor = page.locator('head meta[property="book:author"]');
  await expect(bookAuthor).toHaveCount(2);
  await expect(bookAuthor.nth(0)).toHaveAttribute('content', 'https://www.example.com/authors/@firstnameA-lastnameA');
  await expect(bookAuthor.nth(1)).toHaveAttribute('content', 'https://www.example.com/authors/@firstnameB-lastnameB');
  await expect(page.locator('head meta[property="book:isbn"]')).toHaveAttribute('content', '978-3-16-148410-0');
  const bookTag = page.locator('head meta[property="book:tag"]');
  await expect(bookTag).toHaveCount(3);
  await expect(bookTag.nth(0)).toHaveAttribute('content', 'Tag A');
  await expect(bookTag.nth(1)).toHaveAttribute('content', 'Tag B');
  await expect(bookTag.nth(2)).toHaveAttribute('content', 'Tag C');
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://www.example.com/books/book-title'
  );
  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', 'Open Graph Book Title');
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Description of open graph book'
  );
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveCount(4);
  await expect(ogImage.nth(0)).toHaveAttribute('content', 'https://www.test.ie/og-image-book-title-01.jpg');
  await expect(ogImage.nth(1)).toHaveAttribute('content', 'https://www.test.ie/og-image-book-title-02.jpg');
  await expect(ogImage.nth(2)).toHaveAttribute('content', 'https://www.test.ie/og-image-book-title-03.jpg');
  await expect(ogImage.nth(3)).toHaveAttribute('content', 'https://www.test.ie/og-image-book-title-04.jpg');
  const ogImageAlt = page.locator('head meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveCount(4);
  await expect(ogImageAlt.nth(0)).toHaveAttribute('content', 'Og Image Alt Book Title A');
  await expect(ogImageAlt.nth(1)).toHaveAttribute('content', 'Og Image Alt Book Title B');
  await expect(ogImageAlt.nth(2)).toHaveAttribute('content', 'Og Image Alt Book Title C');
  await expect(ogImageAlt.nth(3)).toHaveAttribute('content', 'Og Image Alt Book Title D');
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
