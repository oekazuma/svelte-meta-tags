<script lang="ts">
  import MetaTagsClient from '$lib/MetaTagsClient.svelte';

  let { children } = $props();
</script>

<MetaTagsClient title="Svelte Meta Tags Layout" />
{@render children()}
