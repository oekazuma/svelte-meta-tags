import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      /* eslint-disable @typescript-eslint/no-var-requires */
      return require('./cypress/plugins/index.cjs')(on, config);
    },
    baseUrl: 'http://localhost:3000',
  },
});
