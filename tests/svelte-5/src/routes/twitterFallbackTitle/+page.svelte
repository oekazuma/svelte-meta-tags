<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- Test 2: Twitter fallback to standard title/description (no OG) -->
<MetaTags
  title="Page Title"
  description="Page Description"
  twitter={{
    cardType: 'summary'
  }}
/>

<h1>Twitter Fallback Title SEO</h1>
