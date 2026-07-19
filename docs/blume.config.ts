import { defineConfig } from 'blume';

export default defineConfig({
  title: 'SvelteMetaTags',
  description: 'Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.',
  content: { root: 'content' },
  logo: {
    image: { light: '/light-logo.svg', dark: '/dark-logo.svg', alt: 'SvelteMetaTags' },
    text: ''
  },
  github: { owner: 'oekazuma', repo: 'svelte-meta-tags', dir: 'docs' },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', label: 'English' },
      { code: 'ja', label: '日本語' }
    ]
  },
  deployment: {
    site: 'https://oekazuma.github.io',
    base: '/svelte-meta-tags'
  },
  redirects: [
    // Installing was merged into Quickstart in the blume migration content overhaul.
    { from: '/installing', to: '/quickstart' },
    { from: '/ja/installing', to: '/ja/quickstart' },
    // deep-merge-function was moved under the new Utilities section.
    { from: '/deep-merge-function', to: '/utilities/deep-merge' },
    { from: '/ja/deep-merge-function', to: '/ja/utilities/deep-merge' },
    // title-template was merged into the new MetaTags Properties > Basic page.
    { from: '/meta-tags-properties/title-template', to: '/meta-tags-properties/basic' },
    { from: '/ja/meta-tags-properties/title-template', to: '/ja/meta-tags-properties/basic' }
  ]
});
