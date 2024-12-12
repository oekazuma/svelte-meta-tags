---
title: Profile
sidebar:
  order: 6
---

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  openGraph={{
    title: 'Open Graph Profile Title',
    description: 'Description of open graph profile',
    url: 'https://www.example.com/@firstlast123',
    type: 'profile',
    profile: {
      firstName: 'First',
      lastName: 'Last',
      username: 'firstlast123',
      gender: 'female'
    },
    images: [
      {
        url: 'https://www.test.ie/images/profile.jpg',
        width: 850,
        height: 650,
        alt: 'Profile Photo'
      }
    ]
  }}
/>
```
