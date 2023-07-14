<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Disabled Robots meta title | Svelte Meta Tags"
  robots={false}
  robotsProps={{
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1
  }}
/>

<h1>Disabled Robots props SEO</h1>
