<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Another Robots meta title | Svelte Meta Tags"
  robots={false}
  additionalRobotsProps={{
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1
  }}
/>

<h1>Another Robots props SEO</h1>
