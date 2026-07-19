---
title: Twitter
sidebar:
  order: 60
---

```ts
interface Twitter {
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  title?: string;
  description?: string;
  creator?: string;
  creatorId?: string;
  image?: string;
  imageAlt?: string;
  player?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
  appNameIphone?: string;
  appIdIphone?: string;
  appUrlIphone?: string;
  appNameIpad?: string;
  appIdIpad?: string;
  appUrlIpad?: string;
  appNameGoogleplay?: string;
  appIdGoogleplay?: string;
  appUrlGoogleplay?: string;
}
```

See [Twitter](/meta-tags-properties/twitter) for usage and fallback behavior.
