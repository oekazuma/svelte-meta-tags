import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [sveltekit({ adapter: adapter() })],
  test: {
    include: ['tests/**/*.test.ts']
  }
});
