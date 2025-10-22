import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageMeta = definePageMetaTags({
    title: 'TOP',
    description: 'Description TOP',
    openGraph: {
      title: 'Open Graph Title TOP',
      description: 'Open Graph Description TOP'
    }
  });

  return { ...pageMeta };
};
