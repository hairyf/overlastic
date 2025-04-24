# Slots And Vnode Field

如果您想同时支持下渲染插槽和字段，只需要定义插槽后传入默认内容。

```vue
<script setup>
import { useExtendOverlay } from '@overlastic/vue'

defineProps({ title: String })

const { visible, /* ... */ } = useExtendOverlay()
</script>

<template>
  <div v-if="visible">
    <slot name="title">
      <!-- 传入默认内容 -->
      {{ title }}
    </slot>
  </div>
</template>
```

如果您想支持某个字段渲染 [VNode](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)，可以使用内置组件 `Field`。

`Field` 会处理 VNode、Component、String 的渲染。

以下是同时支持 Slots、String、VNode、Component 的完整例子：

```vue
<script lang="ts" setup>
import { Field, useExtendOverlay } from '@overlastic/vue'
import { Component, VNode } from 'vue'
defineProps<{
  title?: string | VNode | Component
}>()

const { visible, /* ... */ } = useExtendOverlay()
</script>

<template>
  <div v-if="visible">
    <slot name="title">
      <!-- 传入字符串、虚拟节点或组件 -->
      <Field :is="title" />
    </slot>
  </div>
</template>
```

```ts
const result = await renderOverlay(Component, {
  title: h('div', 'You Content')
})
```
