<script>
  export let schema = undefined;
</script>

<svelte:head>
  {#if schema}
    {@html `<script type="application/ld+json">${
      JSON.stringify({ '@context': 'https://schema.org', ...schema }) + '<'
    }/script>`}
  {/if}
</svelte:head>
