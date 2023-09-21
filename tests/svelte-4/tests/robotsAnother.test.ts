import { test, expect } from '@playwright/test';

interface Message {
  text(): string;
}

const checkConsoleMessagesFor = (expectedMessage: string) => (msg: Message) => {
  return msg.text().includes(expectedMessage);
};

test('Another Robots props SEO applied correctly', async ({ page }) => {
  const consoleMessagePromise = new Promise((resolve) => {
    page.on('console', (msg) => {
      if (checkConsoleMessagesFor('additionalRobotsProps cannot be used when robots is set to false')(msg)) {
        resolve(null);
      }
    });
  });

  await page.goto('/robots/another');
  await expect(page).toHaveTitle('Another Robots meta title | Svelte Meta Tags');
  await expect(page.locator('h1')).toContainText('Another Robots props SEO');
  await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);

  await Promise.race([
    consoleMessagePromise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Console message not found')), 5000))
  ]);
});
