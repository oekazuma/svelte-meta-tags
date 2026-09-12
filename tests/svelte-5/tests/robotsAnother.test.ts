import { test, expect } from '@playwright/test';

test('robots=false suppresses the robots meta tag and warns about additionalRobotsProps', async ({ page }) => {
  const warning = page.waitForEvent('console', {
    predicate: (msg) => msg.text().includes('additionalRobotsProps cannot be used when robots is set to false')
  });
  await page.goto('/robots/another', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
  await warning;
});
