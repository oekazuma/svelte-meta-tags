<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- Test 3: Explicit twitter values take priority over fallbacks -->
<MetaTags
  title="Page Title"
  description="Page Description"
  twitter={{
    cardType: 'summary',
    title: 'Twitter Title',
    description: 'Twitter Description'
  }}
  openGraph={{
    title: 'OG Title',
    description: 'OG Description'
  }}
/>

<h1>Twitter Fallback Explicit SEO</h1>
