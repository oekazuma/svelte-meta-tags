import { test, expect } from '@playwright/test';

const checkConsoleMessagesFor = (expectedMessage) => (msg) => {
  return msg.text().includes(expectedMessage);
};

test('Another Robots props SEO applied correctly', async ({ page }) => {
  let isMessageFound = false;

  page.on('console', msg => {
    isMessageFound = checkConsoleMessagesFor('additionalRobotsProps cannot be used when robots is set to false')(msg);
  });

  await page.goto('/robots/another');
  await expect(page).toHaveTitle('Another Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Another Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);

  expect(isMessageFound).toBeTruthy();
});