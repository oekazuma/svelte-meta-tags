<script lang="ts">
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';
  import { MetaTags, deepMerge } from 'svelte-meta-tags';

  interface Props {
    data: LayoutData;
    children: Snippet;
  }

  let { data, children }: Props = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}

<ul>
  <li>
    <a href="/"> TOP </a>
  </li>
  <li>
    <a href="/about"> About </a>
  </li>
</ul>
