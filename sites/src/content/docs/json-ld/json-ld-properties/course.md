---
title: Course
---

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'Course',
    name: 'Introduction to Computer Science and Programming',
    description: 'Introductory CS course laying out the basics.',
    provider: {
      '@type': 'Organization',
      name: 'University of Technology - Eureka',
      sameAs: 'http://www.ut-eureka.edu'
    }
  }}
/>
```