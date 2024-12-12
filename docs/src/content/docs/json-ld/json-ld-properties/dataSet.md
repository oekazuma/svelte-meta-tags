---
title: DataSet
sidebar:
  order: 6
---

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Dataset',
    name: 'name of the dataset',
    description: 'The description needs to be at least 50 characters long',
    license: 'https//www.example.com'
  }}
/>
```
