import { expect, test } from 'vitest';
import type { SearchAction, VideoObject, WebSite, WithActionConstraints, WithContext } from 'schema-dts';
import type { JsonLdProps } from '$lib/types';

// Type-level guard: `pnpm check` (svelte-check) fails if `JsonLdProps['schema']` stops accepting
// any of these shapes. The runtime assertion only keeps vitest from reporting an empty file.
const potentialAction: WithActionConstraints<SearchAction> = {
  '@type': 'SearchAction',
  target: 'https://example.com/search?q={search_term_string}',
  'query-input': 'required name=search_term_string'
};

const website: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Example Website',
  url: 'https://example.com',
  potentialAction
};

const video: WithContext<VideoObject> = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Learn Svelte',
  uploadDate: '2024-01-15T10:00:00Z'
};

const schemas: JsonLdProps['schema'][] = [
  website,
  video,
  {
    '@type': 'EntryPoint',
    urlTemplate: 'https://example.com/form',
    'form-input': 'required name=form_data',
    'form-output': 'application/json'
  },
  { '@graph': [{ '@type': 'BreadcrumbList' }, { '@type': 'NewsArticle', headline: 'Article headline' }] },
  [{ '@type': 'BreadcrumbList' }, { '@type': 'NewsArticle', headline: 'Article headline' }]
];

test('JsonLdProps.schema accepts schema-dts and plain object shapes', () => {
  expect(schemas).toHaveLength(5);
});
