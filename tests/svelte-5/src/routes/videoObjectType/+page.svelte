<script lang="ts">
  import type { WithContext, VideoObject } from 'schema-dts';
  import { MetaTags, JsonLd } from 'svelte-meta-tags';

  const jsonLdSchema: WithContext<VideoObject> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Learn Svelte in 10 Minutes',
    description:
      'A comprehensive introduction to Svelte framework covering components, reactivity, and state management.',
    contentUrl: 'https://example.com/videos/svelte-tutorial.mp4',
    thumbnailUrl: 'https://example.com/thumbnails/svelte-tutorial.jpg',
    uploadDate: '2024-01-15T10:00:00Z'
  };
</script>

<MetaTags
  title="VideoObject Type Test"
  titleTemplate="%s | Svelte Meta Tags"
  description="Testing VideoObject schema type with schema-dts"
/>

<JsonLd schema={jsonLdSchema} />

<h1>VideoObject Type Test</h1>
<p>This page tests the VideoObject schema type with schema-dts.</p>
