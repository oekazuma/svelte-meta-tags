import { bench, describe } from 'vitest';
import { serializeRobots } from '$lib/robots';
import type { AdditionalRobotsProps } from '$lib/types';

const two: AdditionalRobotsProps = { noarchive: true, maxImagePreview: 'large' };

const all: AdditionalRobotsProps = {
  nosnippet: true,
  notranslate: true,
  noimageindex: true,
  noarchive: true,
  unavailableAfter: '2030-12-31',
  maxSnippet: -1,
  maxImagePreview: 'none',
  maxVideoPreview: -1
};

describe('serializeRobots', () => {
  bench('no additional props', () => {
    serializeRobots('index,follow', undefined);
  });

  bench('two directives', () => {
    serializeRobots('index,follow', two);
  });

  bench('all eight directives', () => {
    serializeRobots('index,follow', all);
  });

  bench('robots false', () => {
    serializeRobots(false, all);
  });
});
