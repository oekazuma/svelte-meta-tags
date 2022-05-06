<script>
  export let output = 'head';
  export let schema = undefined;

  const jsonSchema = (schema) =>
    JSON.stringify({ '@context': 'https://schema.org', ...schema }, null, 2);
</script>

<svelte:head>
  {#if schema && output === 'head'}
    {@html `${'<scri' + 'pt type="application/ld+json">'}${jsonSchema(schema)}${'</scri' + 'pt>'}`}
  {/if}
</svelte:head>

{#if schema && output === 'body'}
  {@html `${'<scri' + 'pt type="application/ld+json">'}${jsonSchema(schema)}${'</scri' + 'pt>'}`}
{/if}
