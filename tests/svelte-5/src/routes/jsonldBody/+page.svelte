<script>
  import { MetaTags, JsonLd } from 'svelte-meta-tags';
</script>

<MetaTags title="JSON-LD Body Page Title | Svelte Meta Tags" />

<JsonLd output="body" schema={{ '@type': 'NewsArticle', headline: 'Article headline' }} />

<h1>JSON-LD Body SEO</h1>
