<script lang="ts">
  import { page } from '$app/stores';
  import { MetaTags, deepMerge } from 'svelte-meta-tags';

  export let data;

  $: metaTags = deepMerge(data.baseMetaTags, $page.data.pageMetaTags);
</script>

<MetaTags {...metaTags} />

<slot />

<ul>
  <li>
    <a href="/"> TOP </a>
  </li>
  <li>
    <a href="/about"> About </a>
  </li>
</ul>
