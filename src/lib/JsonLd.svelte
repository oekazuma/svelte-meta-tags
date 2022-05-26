<script>
  export let output = 'head';
  export let schema = {};

  $: isValid = schema && typeof schema === 'object';
  $: json = `${'<scri' + 'pt type="application/ld+json">'}${JSON.stringify({ '@context': 'https://schema.org', ...schema })}${'</scri' + 'pt>'}`;
</script>

<svelte:head>
  {#if isValid && output === 'head'}
    {@html json}
  {/if}
</svelte:head>

{#if isValid && output === 'body'}
  {@html json}
{/if}
