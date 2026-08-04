import { describe, expect, test } from 'vitest';
import JsonLd from '$lib/JsonLd.svelte';
import { renderBody, renderHead } from '../helpers/head';

const article = { '@type': 'Article', headline: 'Headline' };

describe('output target', () => {
  test('renders into the head by default', () => {
    expect(renderHead(JsonLd, { schema: article }).jsonLd).toHaveLength(1);
    expect(renderBody(JsonLd, { schema: article }).jsonLd).toHaveLength(0);
  });

  test('renders into the head for output="head"', () => {
    expect(renderHead(JsonLd, { schema: article, output: 'head' }).jsonLd).toHaveLength(1);
  });

  test('renders inline for output="body"', () => {
    expect(renderBody(JsonLd, { schema: article, output: 'body' }).jsonLd).toHaveLength(1);
    expect(renderHead(JsonLd, { schema: article, output: 'body' }).jsonLd).toHaveLength(0);
  });

  test('renders nothing when schema is omitted', () => {
    expect(renderHead(JsonLd, {}).jsonLd).toHaveLength(0);
    expect(renderBody(JsonLd, {}).jsonLd).toHaveLength(0);
  });

  test('renders nothing for a non-object schema', () => {
    expect(renderHead(JsonLd, { schema: 'not an object' }).jsonLd).toHaveLength(0);
  });
});

describe('@context injection', () => {
  test('injects the schema.org context', () => {
    const [json] = renderHead(JsonLd, { schema: article }).jsonLd;

    expect(JSON.parse(json)).toEqual({ '@context': 'https://schema.org', '@type': 'Article', headline: 'Headline' });
  });

  test('injects the context into every entry of an array', () => {
    const [json] = renderHead(JsonLd, { schema: [article, { '@type': 'Person', name: 'Jane' }] }).jsonLd;
    const parsed = JSON.parse(json);

    expect(parsed).toHaveLength(2);
    expect(parsed[0]['@context']).toBe('https://schema.org');
    expect(parsed[1]).toEqual({ '@context': 'https://schema.org', '@type': 'Person', name: 'Jane' });
  });

  test('wraps a @graph without touching its members', () => {
    const graph = { '@graph': [article, { '@type': 'Person', name: 'Jane' }] };
    const [json] = renderHead(JsonLd, { schema: graph }).jsonLd;
    const parsed = JSON.parse(json);

    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@graph']).toEqual(graph['@graph']);
  });

  test('a caller-supplied @context wins', () => {
    const [json] = renderHead(JsonLd, { schema: { '@context': 'https://example.test', ...article } }).jsonLd;

    expect(JSON.parse(json)['@context']).toBe('https://example.test');
  });
});

describe('script tag escaping', () => {
  test('values containing </script> stay inside the script tag', () => {
    const rendered = renderHead(JsonLd, {
      schema: { '@type': 'Article', headline: 'Escape </script> test <b>not bold</b>' }
    });

    expect(rendered.jsonLd).toHaveLength(1);
    expect(JSON.parse(rendered.jsonLd[0]).headline).toBe('Escape </script> test <b>not bold</b>');
  });

  test('every < is emitted as a \\u003c escape', () => {
    const [json] = renderHead(JsonLd, { schema: { '@type': 'Article', headline: '<b>x</b>' } }).jsonLd;

    expect(json).not.toContain('<');
    expect(json).toContain('\\u003c');
  });
});

describe('flexible schema shapes', () => {
  test('preserves hyphenated keys such as query-input', () => {
    const [json] = renderHead(JsonLd, {
      schema: {
        '@type': 'SearchAction',
        target: 'https://example.test/search?query={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }).jsonLd;

    expect(JSON.parse(json)['query-input']).toBe('required name=search_term_string');
  });

  test('preserves an array @type', () => {
    const [json] = renderHead(JsonLd, { schema: { '@type': ['Article', 'BlogPosting'] } }).jsonLd;

    expect(JSON.parse(json)['@type']).toEqual(['Article', 'BlogPosting']);
  });

  test('preserves nested actions', () => {
    const [json] = renderHead(JsonLd, {
      schema: {
        '@type': 'WebSite',
        url: 'https://example.test',
        potentialAction: { '@type': 'SearchAction', target: 'https://example.test/s?q={q}', 'query-input': 'required' }
      }
    }).jsonLd;

    expect(JSON.parse(json).potentialAction['@type']).toBe('SearchAction');
  });
});
