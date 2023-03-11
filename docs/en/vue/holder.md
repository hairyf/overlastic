# Injection Holder

In addition to using createOverlay and renderOverlay to create pop-up components, you can also use useInjectHolder to create pop-up components inside a component and inherit the current context of the application.

```vue
<!-- App.vue -->
<script setup>
import { useInjectHolder } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'
// Use useInjectHolder(Component) to create a component holder that supports the current context.
const [overlayApi, holder] = useInjectHolder(OverlayComponent)

function open() {
  // Open the pop-up component.
  overlayApi()
    .then((result) => {})
}
</script>

<template>
  <div @click="overlayApi">
    open
  </div>
  <!-- Use <component :is="holder" /> to mount the component holder. -->
  <component :is="holder" />
</template>
```

