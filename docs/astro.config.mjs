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
          autogenerate: { directory: 'installing' },
          collapsed: true
        },
        {
          label: 'Usage',
          translations: {
            ja: '使い方'
          },
          autogenerate: { directory: 'usage' },
          collapsed: true
        },
        {
          label: 'MetaTags Properties',
          translations: {
            ja: 'MetaTagsプロパティ'
          },
          autogenerate: { directory: 'meta-tags-properties' },
          collapsed: true
        },
        {
          label: 'Open Graph',
          translations: {
            ja: 'Open Graph'
          },
          autogenerate: { directory: 'open-graph' },
          collapsed: true
        },
        {
          label: 'JSON-LD',
          translations: {
            ja: 'JSON-LD'
          },
          autogenerate: { directory: 'json-ld' },
          collapsed: true
        },
        {
          label: 'Deep Merge function',
          translations: {
            ja: 'Deep Merge 関数'
          },
          autogenerate: { directory: 'deep-merge-function' },
          collapsed: true
        },
        {
          label: 'Types',
          translations: {
            ja: '型定義'
          },
          autogenerate: { directory: 'types' },
          collapsed: true
        },
        {
          label: 'Migration Guide',
          translations: {
            ja: '移行ガイド'
          },
          autogenerate: { directory: 'migration-guide' },
          collapsed: true
        }
      ]
    })
  ]
});
