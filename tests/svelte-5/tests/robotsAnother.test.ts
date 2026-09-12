import { test, expect } from '@playwright/test';

test('robots=false suppresses the robots meta tag and warns about additionalRobotsProps', async ({ page }) => {
  const warning = page.waitForEvent('console', {
    predicate: (msg) => msg.text().includes('additionalRobotsProps cannot be used when robots is set to false'),
    timeout: 5000
  });
  await page.goto('/robotsAnother', { waitUntil: 'domcontentloaded' });
  await warning;
  await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
});
