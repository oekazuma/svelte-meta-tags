---
title: FAQ
---

```svelte
<script>
  import { JsonLd } from 'svelte-meta-tags';
</script>

<JsonLd
  schema={{
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long is the delivery time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '3-5 business days.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I find information about product recalls?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Read more on under information.'
        }
      }
    ]
  }}
/>
```