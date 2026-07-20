import { test, expect } from '@playwright/test';

test('JSON-LD values containing </script> stay inside the script tag', async ({ page }) => {
  await page.goto('/jsonldEscape', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('JSON-LD Escape SEO');
  const scripts = page.locator('head script[type="application/ld+json"]');
  await expect(scripts).toHaveCount(1);
  const raw = await scripts.first().textContent();
  const parsed = JSON.parse(raw ?? '');
  expect(parsed.headline).toBe('Escape </script> test <b>not bold</b>');
  // タグ突破が起きていれば <b> 要素が DOM に生成されてしまう
  await expect(page.locator('head b, body b')).toHaveCount(0);
});
