# Injection Holder

除了使用 `createOverlay` 与 `renderOverlay` 创建使用弹出层组件外，还支持使用 `useInjectHolder` 创建在组件内部的弹出层组件。

通过 `useInjectHolder(Component)` 创建支持当前 `context` 的组件持有者（`holder`）

在使用 `<component :is="holder" />` 挂载。


```vue
<!-- App.vue -->
<script setup>
import { useInjectHolder } from '@unoverlays/vue'
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

