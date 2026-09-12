import { test, expect } from '@playwright/test';

test('og:type=book renders the book:* sub-block', async ({ page }) => {
  await page.goto('/book', { waitUntil: 'domcontentloaded' });
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
});
