# 🏔️ 定制化弹出层

以[element-plus(dialog)](https://element.eleme.cn/#/zh-CN/component/dialog)为例（其他组件库同理）

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
    <!-- 你的定制化内容 -->
    <button @click="confirm(`${title}:confirmed`)" />
  </el-dialog>
</template>
```

```ts
import { defineOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

const callback = defineOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```