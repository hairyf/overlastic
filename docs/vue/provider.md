# Injection Provider ✨ (v0.5.0)

In the presence of Context/Provider, accessing the current node context can become quite cumbersome. Using `useOverlayHolder` requires placing the `holder` in the node, while a global `Provider` can inherit the context from the node and render all pop-ups in batches.

Therefore, we provide the following components and hooks support:

```vue
<script setup>
import { OverlayProvider } from '@overlastic/react'
</script>

<template>
  <OverlayProvider>
    <App />
  </OverlayProvider>
</template>
```

In the page, use any Overlay Component using `useOverlay`:

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'

const openCustomDialog = useOverlay(CustomDialog)

async function onClick() {
  const resolved = await openCustomDialog({ title: 'My Title' })
  console.log(resolved)
}
</script>

<template>
  <button @click="onClick">
    Open Modal
  </button>
</template>
```
