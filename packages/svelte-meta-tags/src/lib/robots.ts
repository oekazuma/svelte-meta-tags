import type { AdditionalRobotsProps, MetaTagsProps } from './types';

export const ROBOTS_CONFLICT_WARNING = 'additionalRobotsProps cannot be used when robots is set to false';

type Directive = readonly [key: keyof AdditionalRobotsProps, format: (value: string | number | boolean) => string];

/**
 * Order is significant: it is the order the directives are emitted in and is
 * covered by tests. Append new directives at the end rather than inserting.
 */
const DIRECTIVES: readonly Directive[] = [
  ['nosnippet', () => 'nosnippet'],
  ['maxSnippet', (value) => `max-snippet:${value}`],
  ['maxImagePreview', (value) => `max-image-preview:${value}`],
  ['noarchive', () => 'noarchive'],
  ['unavailableAfter', (value) => `unavailable_after:${value}`],
  ['noimageindex', () => 'noimageindex'],
  ['maxVideoPreview', (value) => `max-video-preview:${value}`],
  ['notranslate', () => 'notranslate']
];

/**
 * Build the `content` value for `<meta name="robots">`.
 *
 * Falsy directive values are dropped, so `maxSnippet: 0` emits nothing.
 *
 * @returns the content string, or `null` when no tag should be rendered at all
 */
export const serializeRobots = (
  robots: MetaTagsProps['robots'],
  additionalRobotsProps: AdditionalRobotsProps | undefined
): string | null => {
  if (robots === false) return null;
  if (!additionalRobotsProps) return `${robots}`;

  const params = DIRECTIVES.filter(([key]) => additionalRobotsProps[key]).map(
    ([key, format]) => `,${format(additionalRobotsProps[key] as string | number | boolean)}`
  );

  return `${robots}${params.join('')}`;
};
