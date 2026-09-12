<script>
  import { MetaTags, JsonLd } from 'svelte-meta-tags';
</script>

<MetaTags title="JSON-LD Array Page Title | Svelte Meta Tags" />

<JsonLd
  schema={[
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Books' }] },
    { '@type': 'NewsArticle', headline: 'Article headline' }
  ]}
/>

<h1>JSON-LD Array SEO</h1>
