# Slots And Vnode Field

如果您想支持 template 模式下渲染插槽，以及 props 中传入的某个字段，只需要定义插槽后传入默认内容。

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'
defineProps({ title: String })

const { visible, /* ... */ } = useOverlay()
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

如果您想在回调（命令式）下，支持某个字段渲染 [VNode](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)，建议您使用内置组件 `Field`。

`Field` 会帮您处理 VNode、Component、String 的渲染，它可以在回调和 `template` 下同时使用。

以下是同时支持 Slots、String、VNode、Component 的完整例子：

```vue
<script lang="ts" setup>
import { Component, VNode } from 'vue'
import { Field, useOverlay } from '@overlastic/vue'
defineProps<{
  title?: String | VNode | Component
}>()

const { visible, /* ... */ } = useOverlay()
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