<script lang="ts">
  import { page } from '$app/state';
  import { MetaTags, deepMerge } from 'svelte-meta-tags';
  import { resolve } from '$app/paths';

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}

<ul>
  <li>
    <a href={resolve('/')}> TOP </a>
  </li>
  <li>
    <a href={resolve('/about')}> About </a>
  </li>
</ul>
