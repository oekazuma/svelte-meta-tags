---
title: OpenGraph
---

```ts
interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImage>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  audio?: ReadonlyArray<OpenGraphAudio>;
  locale?: string;
  siteName?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}
```
