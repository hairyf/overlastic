# Injection Holder

In addition to using `createOverlay` and `renderOverlay` to create and use pop-up layer components, it also supports using `useInjectHolder` to create pop-up layer components inside components.

Create a component holder (`holder`) that supports the current `context` through `useInjectHolder(Component)`

When using `<component: is="holder"/>`, mount.


```vue
<!-- App.vue -->
<script setup>
import { useInjectHolder } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'
const [overlayApi, holder] = useInjectHolder(OverlayComponent)

function open() {
  overlayApi()
    .then((result) => {})
}
</script>

<template>
  <div @click="overlayApi">
    open
  </div>
  <component :is="holder" />
</template>
```

