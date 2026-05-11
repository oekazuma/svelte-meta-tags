import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://oekazuma.github.io/',
  base: '/svelte-meta-tags',
  integrations: [
    starlight({
      title: 'SvelteMetaTags',
      locales: {
        root: { label: 'English', lang: 'en' },
        ja: { label: '日本語', lang: 'ja' }
      },
      description: 'Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.',
      customCss: ['./src/styles/custom.css'],
      logo: {
        light: './src/assets/light-logo.svg',
        dark: './src/assets/dark-logo.svg',
        alt: 'SvelteMetaTags',
        replacesTitle: true
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/oekazuma/svelte-meta-tags' }],
      sidebar: [
        {
          label: 'Installing',
          translations: {
            ja: 'インストール'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'installing', collapsed: true } }]
        },
        {
          label: 'Usage',
          translations: {
            ja: '使い方'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'usage', collapsed: true } }]
        },
        {
          label: 'MetaTags Properties',
          translations: {
            ja: 'MetaTagsプロパティ'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'meta-tags-properties', collapsed: true } }]
        },
        {
          label: 'Open Graph',
          translations: {
            ja: 'Open Graph'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'open-graph', collapsed: true } }]
        },
        {
          label: 'JSON-LD',
          translations: {
            ja: 'JSON-LD'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'json-ld', collapsed: true } }]
        },
        {
          label: 'Deep Merge function',
          translations: {
            ja: 'Deep Merge 関数'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'deep-merge-function', collapsed: true } }]
        },
        {
          label: 'Types',
          translations: {
            ja: '型定義'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'types', collapsed: true } }]
        },
        {
          label: 'Migration Guide',
          translations: {
            ja: '移行ガイド'
          },
          collapsed: true,
          items: [{ autogenerate: { directory: 'migration-guide', collapsed: true } }]
        }
      ]
    })
  ]
});
