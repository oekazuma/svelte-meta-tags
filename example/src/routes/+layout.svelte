<script lang="ts">
  import { page } from '$app/stores';
  import { MetaTags } from 'svelte-meta-tags';
  import extend from 'just-extend'; // Please provide functions that allow deep merging of objects, such as lodash.merge, deepmerge, just-extend.

  export let data;

  $: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
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
