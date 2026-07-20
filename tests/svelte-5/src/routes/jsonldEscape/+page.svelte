<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Article',
    headline: 'Escape </script> test <b>not bold</b>',
    description: 'Values containing markup must stay inside the JSON-LD script tag'
  }}
/>

<h1>JSON-LD Escape SEO</h1>
