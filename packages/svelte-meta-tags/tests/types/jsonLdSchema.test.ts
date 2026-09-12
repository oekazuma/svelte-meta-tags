import { assertType, test } from 'vitest';
import type { SearchAction, VideoObject, WebSite, WithActionConstraints, WithContext } from 'schema-dts';
import type { JsonLdProps } from '$lib/types';

// Enforced by `pnpm check` (svelte-check), not by vitest: vitest strips types before running.
test('JsonLdProps.schema accepts schema-dts and plain object shapes', () => {
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

  assertType<JsonLdProps['schema']>(website);
  assertType<JsonLdProps['schema']>(video);
  assertType<JsonLdProps['schema']>({
    '@type': 'EntryPoint',
    urlTemplate: 'https://example.com/form',
    'form-input': 'required name=form_data',
    'form-output': 'application/json'
  });
  assertType<JsonLdProps['schema']>({ '@graph': [{ '@type': 'BreadcrumbList' }] });
  assertType<JsonLdProps['schema']>([{ '@type': 'BreadcrumbList' }, { '@type': 'NewsArticle' }]);

  // @ts-expect-error a primitive must be rejected; svelte-check fails on the unused directive if schema is widened
  assertType<JsonLdProps['schema']>(42);
});
