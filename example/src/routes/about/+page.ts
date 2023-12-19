import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
  const pageMetaTags = Object.freeze({
    title: 'About',
    description: 'Description About',
    openGraph: {
      title: 'Open Graph Title About',
      description: 'Open Graph Description About'
    }
  }) satisfies MetaTagsProps;

  return {
    pageMetaTags
  };
};
