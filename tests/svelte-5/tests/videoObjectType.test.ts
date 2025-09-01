import { test, expect } from '@playwright/test';

test('VideoObject type test page', async ({ page }) => {
  await page.goto('/videoObjectType');

  await expect(page).toHaveTitle(/VideoObject Type Test/);

  await expect(page.getByRole('heading', { name: 'VideoObject Type Test' })).toBeVisible();

  const jsonLdScript = page.locator('script[type="application/ld+json"]');
  await expect(jsonLdScript).toBeAttached();

  const scriptContent = await jsonLdScript.textContent();
  expect(scriptContent).not.toBeNull();
  expect(scriptContent?.trim()).not.toBe('');
  const jsonData = JSON.parse(scriptContent as string);

  expect(jsonData['@context']).toBe('https://schema.org');
  expect(jsonData['@type']).toBe('VideoObject');
  expect(jsonData.name).toBe('Learn Svelte in 10 Minutes');
  expect(jsonData.description).toBe(
    'A comprehensive introduction to Svelte framework covering components, reactivity, and state management.'
  );
  expect(jsonData.contentUrl).toBe('https://example.com/videos/svelte-tutorial.mp4');
  expect(jsonData.thumbnailUrl).toBe('https://example.com/thumbnails/svelte-tutorial.jpg');
  expect(jsonData.uploadDate).toBe('2024-01-15T10:00:00Z');
});
