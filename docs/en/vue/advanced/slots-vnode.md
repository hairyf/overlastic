# Slots And Vnode Field

If you want to support rendering slots and a certain field passed in props in template mode, you just need to define default content for the slot.

```vue
<script setup>
import { usePrograms } from '@overlastic/vue'
defineProps({ title: String })

const { visible, /* ... */ } = usePrograms()
</script>

<template>
  <div v-if="visible">
    <slot name="title">
      <!-- default content -->
      {{ title }}
    </slot>
  </div>
</template>
```

If you want to support rendering a certain field as a [VNode](https://vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom) in callback (imperative) mode, we recommend using the built-in Field component.

Field will help you handle the rendering of VNode|Component|string, and it can be used in both callback and template mode.

Here is a complete example that supports rendering Slots, String, VNode, and Component:

```vue
<script lang="ts" setup>
import { Component, VNode } from 'vue'
import { Field, usePrograms } from '@overlastic/vue'
defineProps<{
  title?: String | VNode | Component
}>()

const { visible, /* ... */ } = usePrograms()
</script>

<template>
  <div v-if="visible">
    <slot name="title">
      <!-- string, VNode, or Component -->
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