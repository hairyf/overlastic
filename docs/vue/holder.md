## Injection Holder

In addition to creating pop-up components using `defineOverlay` and `renderOverlay`, you can also use `useOverlay` to create pop-up components within a component and inherit the current context of the application.

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'
import { OverlayComponent } from './overlay'

// Create a component holder that supports the current context using useOverlay(Component)
const [holder, openOverlay] = useOverlay(OverlayComponent, { type: 'holder' })
function onClick() {
  // Open the overlay
  openOverlay().then((result) => {})
}
</script>

<template>
  <!-- Mount the holder -->
  <holder />
  <button @click="onClick">
    open
  </button>
</template>
```
