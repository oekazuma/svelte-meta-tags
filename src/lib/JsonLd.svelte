<script>
  export let output = 'head';
  export let schema = undefined;

  const render_json_script_dict = {
    '<': '\\u003C',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  };

  const render_json_script_regex = new RegExp(
    `[${Object.keys(render_json_script_dict).join('')}]`,
    'g'
  );

  const safe_schema = JSON.stringify({ '@context': 'https://schema.org', ...schema }).replace(
    render_json_script_regex,
    (match) => render_json_script_dict[match]
  );
</script>

<svelte:head>
  {#if schema && output === 'head'}
    {@html `<script type="application/ld+json">${safe_schema + '<'}/script>`}
  {/if}
</svelte:head>

{#if schema && output === 'body'}
  {@html `<script type="application/ld+json">${safe_schema + '<'}/script>`}
{/if}
