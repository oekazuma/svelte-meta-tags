import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          'svelte-meta-tags': path.resolve('src/lib')
        }
      }
    }
  }
};

export default config;
