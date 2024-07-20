# Slots And Vnode Field

If you want to support both slot rendering and fields simultaneously, you just need to define the slot and pass in default content.

```vue
<script setup>
import { useExtendOverlay } from '@overlastic/vue'

defineProps({ title: String })

const { visible, /* ... */ } = useExtendOverlay()
</script>

<template>
  <div v-if="visible">
    <slot name="title">
      <!-- Pass in default content -->
      {{ title }}
    </slot>
  </div>
</template>
```

If you want to support rendering a [VNode](https://v3.vuejs.org/guide/migration/vnode.html) for a specific field, you can use the built-in component `Field`.

`Field` handles rendering of VNodes, Components, and Strings.

Here is a complete example that supports Slots, Strings, VNodes, and Components simultaneously:

```vue
<script lang="ts" setup>
import { Component, VNode } from 'vue'
import { Field, useExtendOverlay } from '@overlastic/vue'
defineProps<{
  title?: string | VNode | Component
}>()

const { visible, /* ... */ } = useExtendOverlay()
</script>

<template>
  <div v-if="visible">
    <slot name="title">
      <!-- Pass in a string, VNode, or component -->
      <Field :is="title" />
    </slot>
  </div>
</template>
```

```ts
const result = await renderOverlay(Component, {
  title: h('div', 'Your Content')
})
```
