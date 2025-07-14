# 定制化弹出层

以[element-plus(dialog)](https://element.eleme.cn/#/zh-CN/component/dialog)为例（其他组件库同理）

```vue
<!-- overlay.vue -->
<script setup>
import { useDisclosure } from '@overlastic/vue'
import { defineEmits, defineProps } from 'vue-demi'
const props = defineProps({
  title: String,
})

const { visible, confirm, cancel } = useDisclosure({
  duration: 1000
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" @close="reject()">
    <!-- 你的定制化内容 -->
    <button @click="resolve(`${title}:confirmed`)" />
  </el-dialog>
</template>
```

```ts
import { defineOverlay } from '@overlastic/vue'
import OverlayComponent from './overlay.vue'

const callback = defineOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```
