<script lang="ts">
  import type { JsonLdProps } from './types';

  let { output = 'head', schema = undefined }: Partial<JsonLdProps> = $props();

  // Narrowing or passing the huge schema-dts unions in `schema` makes type-checking this file take tens of seconds.
  let data = $derived<unknown>(schema);

  let isValid = $derived(!!data && typeof data === 'object');

  const addContext = (context: unknown) => ({
    '@context': 'https://schema.org',
    ...(context as object)
  });

  let escapedJson = $derived(
    JSON.stringify(Array.isArray(data) ? data.map(addContext) : addContext(data)).replace(/</g, '\\u003c')
  );

  let json = $derived(`${'<scri' + 'pt type="application/ld+json">'}${escapedJson}${'</scri' + 'pt>'}`);
</script>

<svelte:head>
  {#if isValid && output === 'head'}
    {@html json}
  {/if}
</svelte:head>

{#if isValid && output === 'body'}
  {@html json}
{/if}
