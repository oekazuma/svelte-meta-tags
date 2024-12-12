---
title: Video
sidebar:
  order: 3
---

詳しい情報は[http://ogp.me/](http://ogp.me/#type_video)をご覧ください。

```svelte
<script>
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
  title="Video Page Title"
  description="Description of video page"
  openGraph={{
    title: 'Open Graph Video Title',
    description: 'Description of open graph video',
    url: 'https://www.example.com/videos/video-title',
    type: 'video.movie',
    video: {
      actors: [
        {
          profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
          role: 'Protagonist'
        },
        {
          profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
          role: 'Antagonist'
        }
      ],
      directors: [
        'https://www.example.com/directors/@firstnameA-lastnameA',
        'https://www.example.com/directors/@firstnameB-lastnameB'
      ],
      writers: [
        'https://www.example.com/writers/@firstnameA-lastnameA',
        'https://www.example.com/writers/@firstnameB-lastnameB'
      ],
      duration: 680000,
      releaseDate: '2022-12-21T22:04:11Z',
      tags: ['Tag A', 'Tag B', 'Tag C']
    },
    siteName: 'SiteName'
  }}
/>
```
