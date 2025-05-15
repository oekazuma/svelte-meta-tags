<script lang="ts">
  import { useMetaTags } from './meta-tags-context.svelte';
  import MetaTags from './MetaTags.svelte';
  import type { MetaTagsProps } from './types';
  import { box } from 'svelte-toolbelt';

  let { ...props }: Partial<MetaTagsProps> = $props();

  const metaTags = useMetaTags({ props: box.with(() => props) });
</script>

<MetaTags {...metaTags.props} />
