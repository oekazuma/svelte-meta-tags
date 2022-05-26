<script>
  export let output = 'head';
  export let schema = undefined;

  $: jsonSchema = JSON.stringify({ '@context': 'https://schema.org', ...schema });
</script>

<svelte:head>
  {#if schema && output === 'head'}
    {@html `${'<scri' + 'pt type="application/ld+json">'}${jsonSchema}${'</scri' + 'pt>'}`}
  {/if}
</svelte:head>

{#if schema && output === 'body'}
  {@html `${'<scri' + 'pt type="application/ld+json">'}${jsonSchema}${'</scri' + 'pt>'}`}
{/if}
