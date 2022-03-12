<script>
  export let output = 'head';
  export let schema = undefined;
</script>

<svelte:head>
  {#if schema && output === 'head'}
    {@html `<script type="application/ld+json">${
      JSON.stringify({ '@context': 'https://schema.org', ...schema }) + '<'
    }/script>`}
  {/if}
</svelte:head>

{#if schema && output === 'body'}
  {@html `<script type="application/ld+json">${
    JSON.stringify({ '@context': 'https://schema.org', ...schema }) + '<'
  }/script>`}
{/if}
