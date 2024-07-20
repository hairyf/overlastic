# Injection Provider ✨ (v0.5.0+)

In the presence of Context/Provider, accessing the current node context can become quite cumbersome. Using `useOverlayHolder` requires placing the `holder` in the node, while a global `Provider` can inherit the context from the node and render all pop-ups in batches.

Therefore, we provide the following components and hooks support:

```vue
<script setup>
import { OverlaysProvider } from '@overlastic/react'
</script>

<template>
  <OverlaysProvider>
    <App />
  </OverlaysProvider>
</template>
```

In the page, use any Overlay Component using `useOverlayInject`:

```vue
<script setup>
import { useOverlayInject } from '@overlastic/vue'

const openCustomDialog = useOverlayInject(CustomDialog)

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
