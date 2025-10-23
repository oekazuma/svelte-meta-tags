import { definePageMetaTags } from 'svelte-meta-tags';

export const load = () => {
  const pageTags = definePageMetaTags({
    title: 'About',
    description: 'Description About',
    openGraph: {
      title: 'Open Graph Title About',
      description: 'Open Graph Description About'
    }
  });

  return { ...pageTags };
};
