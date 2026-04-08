<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- Test 5: titleTemplate applied - fallback uses updatedTitle -->
<MetaTags
  title="Home"
  titleTemplate="%s | MySite"
  description="Page Description"
  twitter={{
    cardType: 'summary'
  }}
/>

<h1>Twitter Fallback Template SEO</h1>
