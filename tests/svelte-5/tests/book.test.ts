import { test, expect } from '@playwright/test';

test('Book SEO loads correctly', async ({ page }) => {
  await page.goto('/book', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Book Page Title | Svelte Meta Tags');
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
  await expect(page.locator('head meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://www.test.ie/og-image-book-title-01.jpg'
  );
});
