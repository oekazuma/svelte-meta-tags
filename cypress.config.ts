import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {}, // eslint-disable-line
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
});
