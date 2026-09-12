<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- title: explicit twitter value wins; description: no twitter value, falls back to OpenGraph -->
<MetaTags
  title="Page Title"
  description="Page Description"
  twitter={{
    cardType: 'summary_large_image',
    site: '@site',
    title: 'Twitter Title'
  }}
  openGraph={{
    title: 'OG Title',
    description: 'OG Description'
  }}
/>

<h1>Twitter Fallback SEO</h1>
