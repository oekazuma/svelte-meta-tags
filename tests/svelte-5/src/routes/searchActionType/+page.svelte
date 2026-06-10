<script lang="ts">
  import type { SearchAction, WebSite, WithActionConstraints, WithContext } from 'schema-dts';
  import { MetaTags, JsonLd } from 'svelte-meta-tags';

  const jsonLdSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Example Website',
    url: 'https://example.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://example.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    } as WithActionConstraints<SearchAction>
  };
</script>

<MetaTags
  title="SearchAction Type Test"
  titleTemplate="%s | Svelte Meta Tags"
  description="Testing SearchAction schema type with schema-dts WithActionConstraints"
/>

<JsonLd schema={jsonLdSchema} />

<h1>SearchAction Type Test</h1>
<p>This page tests the SearchAction schema type with schema-dts v2 action constraints.</p>
