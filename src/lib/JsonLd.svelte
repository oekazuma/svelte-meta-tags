<script>
  export let output = 'head';
  export let schema = {};

  $: isValid = schema && typeof schema === 'object';

  function createSchema(schema) {
    const addContext = (context) => ({ '@context': 'https://schema.org', ...context });

    return Array.isArray(schema) ? schema.map((context) => addContext(context)) : addContext(schema);
  }

  $: json = `${'<scri' + 'pt type="application/ld+json">'}${JSON.stringify(createSchema(schema))}${'</scri' + 'pt>'}`;
</script>

<svelte:head>
  {#if isValid && output === 'head'}
    {@html json}
  {/if}
</svelte:head>

{#if isValid && output === 'body'}
  {@html json}
{/if}
