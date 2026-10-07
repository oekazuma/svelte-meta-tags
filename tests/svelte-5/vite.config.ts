import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
  plugins: lazyPlugins(() => [sveltekit({ adapter: adapter() })])
});
