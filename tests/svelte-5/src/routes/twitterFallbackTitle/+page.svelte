<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- no twitter/OpenGraph values: falls back to the templated title and description -->
<MetaTags
  title="Rock $& Roll"
  titleTemplate="%s | MySite"
  description="Page Description"
  twitter={{
    cardType: 'summary'
  }}
/>

<h1>Twitter Fallback Title SEO</h1>
