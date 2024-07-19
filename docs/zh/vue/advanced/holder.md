# Injection Holder

除了使用 `defineOverlay` 与 `renderOverlay` 创建使用弹出层组件外，还支持使用 `useOverlayHolder` 创建在组件内部的弹出层组件，并继承应用的当前上下文。

```vue
<!-- App.vue -->
<script setup>
import { useOverlayHolder } from '@overlastic/vue'
import OverlayComponent from './overlay.vue'
// 通过 useOverlayHolder(Component) 创建支持当前 context 的组件持有者
const [holder, overlayApi] = useOverlayHolder(OverlayComponent)

function open() {
  // 打开弹出层
  overlayApi()
    .then((result) => {})
}
</script>

<template>
  <div @click="open">
    open
  </div>
  <!-- 使用 <component :is="holder" /> 挂载 -->
  <component :is="holder" />
</template>
```
