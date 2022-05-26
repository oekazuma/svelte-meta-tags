<script>
  export let output = 'head';
  export let schema = undefined;

  $: json = `${'<scri' + 'pt type="application/ld+json">'}${JSON.stringify({ '@context': 'https://schema.org', ...schema })${'</scri' + 'pt>'}}`;
</script>

<svelte:head>
  {#if schema && output === 'head'}
    {@html json}
  {/if}
</svelte:head>

{#if schema && output === 'body'}
  {@html json}
{/if}
