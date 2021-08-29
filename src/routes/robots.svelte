<script>
  import { MetaTags } from 'svelte-meta-tags';
  import Links from './_Links.svelte';
</script>

<MetaTags
  title="Robots meta title"
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

<h1>Robots props</h1>
<Links />
