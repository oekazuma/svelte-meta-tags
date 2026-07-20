import { devices, type PlaywrightTestConfig } from '@playwright/test';

// PRs run chromium only for fast feedback; pushes to main (and local runs,
// where GITHUB_EVENT_NAME is unset) run the full cross-browser matrix.
const isPullRequest = process.env.GITHUB_EVENT_NAME === 'pull_request';

const allProjects = [
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
];

const config: PlaywrightTestConfig = {
  timeout: process.env.CI ? 45_000 : 15_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  webServer: {
    command: 'vite build && vite preview --port 4000',
    port: 4000,
    reuseExistingServer: !process.env.CI
  },
  projects: isPullRequest ? allProjects.filter((p) => p.name === 'chromium') : allProjects
};

export default config;
