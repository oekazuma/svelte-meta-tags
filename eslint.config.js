// Oxlint only sees the <script> blocks of .svelte files, so ESLint stays to run eslint-plugin-svelte's template rules.
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config';
import svelte from 'eslint-plugin-svelte';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL('./.gitignore', import.meta.url))),
  globalIgnores(['.agents', '.superpowers', 'docs']),
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
  },
  {
    // Oxlint skips no-unused-vars in .svelte because it can't see template usages; svelte-eslint-parser can.
    files: ['**/*.svelte'],
    plugins: { '@typescript-eslint': ts.plugin },
    rules: { '@typescript-eslint/no-unused-vars': 'error' }
  }
);
