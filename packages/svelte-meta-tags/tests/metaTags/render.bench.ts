import { bench, describe } from 'vitest';
import { render } from 'svelte/server';
import MetaTags from '$lib/MetaTags.svelte';
import JsonLd from '$lib/JsonLd.svelte';

/**
 * Server-render cost of the components. This is the number that matters when
 * judging whether a change to MetaTags is expensive — a difference that does
 * not show up here is not worth trading readability for.
 */

const minimal = { title: 'Home', description: 'Description' };

const typical = {
  title: 'Home',
  titleTemplate: '%s | MySite',
  description: 'Description',
  canonical: 'https://a.test/',
  keywords: ['a', 'b'],
  twitter: { cardType: 'summary_large_image', site: '@site', creator: '@handle' },
  facebook: { appId: '123' },
  openGraph: {
    type: 'article',
    article: { publishedTime: '2021-01-01T00:00:00Z', authors: ['https://a.test/a'], tags: ['x', 'y'] },
    images: [{ url: 'https://a.test/og.jpg', alt: 'alt', width: 1200, height: 630 }],
    locale: 'en_IE',
    siteName: 'SiteName'
  },
  additionalLinkTags: [{ rel: 'icon', href: '/favicon.ico' }]
};

const everyRobotsDirective = {
  ...typical,
  additionalRobotsProps: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    unavailableAfter: '2030-12-31',
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const run = (component: any, props: unknown) => render(component, { props } as any);

describe('MetaTags server render', () => {
  bench('minimal props', () => {
    run(MetaTags, minimal);
  });

  bench('typical page', () => {
    run(MetaTags, typical);
  });

  bench('every robots directive', () => {
    run(MetaTags, everyRobotsDirective);
  });
});

describe('JsonLd server render', () => {
  bench('single schema', () => {
    run(JsonLd, { schema: { '@type': 'Article', headline: 'Headline' } });
  });

  bench('graph of ten', () => {
    run(JsonLd, {
      schema: { '@graph': Array.from({ length: 10 }, (_, i) => ({ '@type': 'Article', headline: `Headline ${i}` })) }
    });
  });
});
/* eslint-enable @typescript-eslint/no-explicit-any */
