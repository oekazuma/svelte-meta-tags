import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    vite: {
      resolve: {
        alias: {
          'svelte-meta-tags': path.resolve(process.cwd(), './src/lib/index.ts')
        }
      }
    }
  }
};

export default config;
