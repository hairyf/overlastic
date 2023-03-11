# 🏔️ Custom Components

Take [element-plus@2.15.7(dialog)](https://element.eleme.cn/#/en-US/component/dialog) as an example (of course, you can use other component libraries)

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
const props = defineProps({
  title: String,
})

const { visible, confirm, cancel } = useOverlayMeta({
  animation: 1000
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" @close="cancel()">
    <!-- your content -->
    <button @click="confirm(`${title}:confirmed`)" />
  </el-dialog>
</template>
```

```ts
import { createOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

const callback = createOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```