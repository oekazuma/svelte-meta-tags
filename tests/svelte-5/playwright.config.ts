import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: process.env.CI ? 45_000 : 15_000,
  retries: process.env.CI ? 5 : 0,
  workers: process.env.CI ? 2 : undefined,
  webServer: {
    command: 'vite build && vite preview --port 4000',
    port: 4000,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ]
};

export default config;
