// Oxlint only sees the <script> blocks of .svelte files, so ESLint stays to run eslint-plugin-svelte's template rules.
import { defineConfig, globalIgnores } from 'eslint/config';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['**/dist', '**/build', '**/.svelte-kit', '.agents', '.superpowers', 'docs']),
  ...svelte.configs.recommended,
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser
      }
    },
    rules: { 'svelte/no-at-html-tags': 'off' }
  }
);
