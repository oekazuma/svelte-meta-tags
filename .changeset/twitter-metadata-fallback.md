---
'svelte-meta-tags': minor
---

feat: add automatic fallback behavior for Twitter metadata. When `twitter.title` is not provided, it falls back to `og:title` then `title`. When `twitter.description` is not provided, it falls back to `og:description` then `description`.
