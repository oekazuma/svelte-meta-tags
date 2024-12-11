import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'SvelteMetaTags',
      description: 'Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.',
      customCss: ['./src/styles/custom.css'],
      logo: {
        src: './src/assets/logo.svg',
        alt: 'SvelteMetaTags',
        replacesTitle: true
      },
      social: {
        github: 'https://github.com/oekazuma/svelte-meta-tags'
      },
      sidebar: [
        {
          label: 'Installing',
          autogenerate: { directory: 'installing' },
          collapsed: true
        },
        {
          label: 'Usage',
          autogenerate: { directory: 'usage' },
          collapsed: true
        },
        {
          label: 'MetaTags Properties',
          autogenerate: { directory: 'meta-tags-properties' },
          collapsed: true
        },
        {
          label: 'Open Graph',
          autogenerate: { directory: 'open-graph' },
          collapsed: true
        },
        {
          label: 'JSON-LD',
          autogenerate: { directory: 'json-ld' },
          collapsed: true
        },
        {
          label: 'Deep Merge function',
          autogenerate: { directory: 'deep-merge-function' },
          collapsed: true
        },
        {
          label: 'Types',
          autogenerate: { directory: 'types' },
          collapsed: true
        },
        {
          label: 'Migration Guide',
          autogenerate: { directory: 'migration-guide' },
          collapsed: true
        }
      ]
    })
  ]
});
