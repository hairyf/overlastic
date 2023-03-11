# Template Support

使用 `unoverlay-vue` 创建的组件，除了支持使用命令式（Imperative）方法调用外，还支持在 `<template>` 中使用。

> 支持了 `<template>` 中使用的组件，同样也支持使用 callback 调用，并不会影响彼此功能，这是一项可选项。

### 步骤.1: Define Component

在 `<template>` 中使用，需要显式定义 `modal` 与 `event`。

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
const props = defineProps({
  title: String,
  // 在 Template 中使用，需要定义 v-modal 所使用的字段（默认对应 visible）
  visible: Boolean
})

// 定义组件中使用的事件类型（默认：cancel、confirm）
defineEmits(['cancel', 'confirm'])

const { visible, confirm, cancel } = useOverlayMeta({
  // 如果使用 template 渲染，animation 则可以不需要定义
  // animation: 1000,
})
</script>
```

如果您想替换为其他的字段与事件名，可以通过 `useOverlayMeta` 传入对应的配置实现。

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
const props = defineProps({
  title: String,
  modalValue: Boolean
})

defineEmits(['nook', 'ok'])

const { visible, confirm, cancel } = useOverlayMeta({
  event: { confirm: 'ok', cancel: 'nook' },
  modal: 'modalValue',
})
</script>

<template>
  ...
</template>
```

### 步骤.2: In Template

定义 `modal` 与 `event` 后，即可在 `<template>` 中使用弹出层组件。

```vue
<!-- overlay.vue -->
<script setup>
import OverlayComponent from './overlay.vue'
const visible = ref(false)

const confirm = () => {
  // ...
}
const cancel = () => {
  // ...
}
</script>

<template>
  <OverlayComponent
    v-model:visible="visible"
    @confirm="confirm"
    @cancel="cancel"
  />
</template>
```