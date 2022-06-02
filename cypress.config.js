import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
});
