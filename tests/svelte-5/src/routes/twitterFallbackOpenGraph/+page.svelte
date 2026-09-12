<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- no twitter title/description: both fall back to the OpenGraph values, not the page ones -->
<MetaTags
  title="Page Title"
  description="Page Description"
  twitter={{
    cardType: 'summary'
  }}
  openGraph={{
    title: 'OG Title',
    description: 'OG Description'
  }}
/>

<h1>Twitter Fallback OpenGraph SEO</h1>
