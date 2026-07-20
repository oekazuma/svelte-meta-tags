---
'svelte-meta-tags': patch
---

fix: escape `<` as the JSON escape sequence `\u003c` in JSON-LD output so schema values containing `</script>` cannot break out of the script tag
