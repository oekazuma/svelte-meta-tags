---
'svelte-meta-tags': patch
---

fix: escape `<` as `<` in JSON-LD output so schema values containing `</script>` cannot break out of the script tag
