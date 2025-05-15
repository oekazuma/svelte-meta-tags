<script>
  import MetaTagsClient from '$lib/MetaTagsClient.svelte';

  let msg = $state('hello');
</script>

<MetaTagsClient title="Svelte Meta Tags {msg}" />
svelte-meta-tags
<button onclick={() => (msg = 'goodbye')}>set goodbye</button>
