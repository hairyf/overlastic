# Injection Provider ✨ (v0.5.0+)

在存在 Context/Provider 的情况下，获取当前节点上下文变得相当麻烦。而使用 `useOverlay` 需要将 `holder` 放置到节点中，全局的 `Provider` 可以继承节点中的上下文，并批量渲染所有弹窗。

所以我们提供了以下的组件与钩子支持：

```vue
<script setup>
import { OverlaysProvider } from '@overlastic/vue'
</script>

<template>
  <OverlaysProvider>
    <App />
  </OverlaysProvider>
</template>
```

在页面中通过 `useOverlay` 使用任意 Overlay Component：

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'

const openCustomDialog = useOverlay(CustomDialog)

async function onClick() {
  const confirmd = await openCustomDialog({ title: 'My Title' })
  console.log(confirmd)
}
</script>

<template>
  <button @click="onClick">
    Open Modal
  </button>
</template>
```
