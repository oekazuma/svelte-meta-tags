import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
  const pageMetaTags = Object.freeze({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  }) satisfies MetaTagsProps;

  return {
    pageMetaTags
  };
};
