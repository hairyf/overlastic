## 🏔️ 定制化弹出层

以[element-plus@2.15.7(dialog)](https://element.eleme.cn/#/zh-CN/component/dialog)为例（你也可以使用其他组件库）

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
})

const { visible, confirm, cancel } = useOverlayMeta({
  animation: 1000
})
</script>

<template>
  <el-dialog v-model:visible="visible" :title="title" @close="cancel()">
    <!-- 你的定制化内容 -->
    <button @click="confirm(`${title}:confirmed`)" />
  </el-dialog>
</template>
```

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const callback = createOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```