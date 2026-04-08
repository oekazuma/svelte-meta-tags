<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- Test 4: Mixed fallback - OG has title only, description falls back to standard meta -->
<MetaTags
  title="Page Title"
  description="Page Description"
  twitter={{
    cardType: 'summary'
  }}
  openGraph={{
    title: 'OG Title'
  }}
/>

<h1>Twitter Fallback Mixed SEO</h1>
