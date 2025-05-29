<script>
  import { MetaTags, JsonLd } from 'svelte-meta-tags';
</script>

<MetaTags title="SearchAction Test | Svelte Meta Tags" description="Test page for SearchAction with query-input" />

<JsonLd
  schema={{
    '@type': 'SearchAction',
    target: 'https://example.com/search?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  }}
/>

<JsonLd
  schema={{
    '@type': 'EntryPoint',
    urlTemplate: 'https://example.com/form',
    'form-input': 'required name=form_data',
    'form-output': 'application/json',
  }}
/>

<h1>SearchAction Test</h1>
