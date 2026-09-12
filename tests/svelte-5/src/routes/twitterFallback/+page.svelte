<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<!-- openGraph present but without description: title falls back to OG, description to the page value -->
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

<h1>Twitter Fallback SEO</h1>
