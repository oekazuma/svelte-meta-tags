<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- Test 1: Twitter fallback to OpenGraph values -->
<MetaTags
  title="Page Title"
  description="Page Description"
  twitter={{
    cardType: 'summary_large_image',
    site: '@site'
  }}
  openGraph={{
    title: 'OG Title',
    description: 'OG Description'
  }}
/>

<h1>Twitter Fallback SEO</h1>
