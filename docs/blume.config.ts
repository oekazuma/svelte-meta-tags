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
  }
});
