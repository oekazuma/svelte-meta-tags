import { test, expect } from '@playwright/test';

test('Another Robots props SEO applied correctly', async ({ page }) => {
  const consoleMessages = [];

  page.on('console', (msg) => {
    consoleMessages.push(msg.text());
  });

  await page.goto('/robots/another');
  await expect(page).toHaveTitle('Another Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Another Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
  expect(consoleMessages).toContain('additionalRobotsProps cannot be used when robots is set to false');
});
