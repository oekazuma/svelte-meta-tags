<script>
  /** @type {import("./types").JsonLdProps['output']} */
  export let output = 'head';

  /** @type {import("./types").JsonLdProps['schema']} */
  export let schema = undefined;

  $: isValid = schema && typeof schema === 'object';

  /**
   * @param {import("./types").JsonLdProps['schema']} schema
   */
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
