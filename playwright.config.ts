import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    reuseExistingServer: !process.env.CI
  }
};

export default config;
