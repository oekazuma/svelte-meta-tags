<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Googlebot Robots meta title | Svelte Meta Tags"
  robots={false}
  additionalMetaTags={[
    {
      name: 'googlebot',
      content: 'index,follow'
    }
  ]}
/>

<h1>Googlebot Robots props SEO</h1>
