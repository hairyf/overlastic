# unoverlay-vue

![image](https://user-images.githubusercontent.com/1655312/70054926-8d469d80-15e9-11ea-9fdc-c8f65bf9bc85.png)

> Oh, this image is from [vuejs-overlay](https://github.com/fattihkoca/vuejs-overlay), but he's really cool and I'm lazy so I stole it (sorry)

> [English](./README.md) | 中文 or see [github.io/unoverlay-vue](https://unoverlay-vue.vercel.app/zh/)

通用的弹出层 Vue2/3 制作工具，它可以: 

- 制作类似于 `element-plus/naiveui/vuetifyjs/vant`... 的 [Message](https://element.eleme.cn/#/en-US/component/message) 或 [Dialog](https://element.eleme.cn/#/en-US/component/dialog)
- 同时支持两种调用方式（ tempalte 或 js/ts）
- 使用现有组件库（如 element-plus）集成和定制化功能
- 支持组件继承全局应用上下文

## ⚙️ Install

```sh
pnpm add unoverlay-vue
# Or Yarn
yarn add unoverlay-vue
```

在 main.js 中全局安装可以使所有弹出层继承上下文

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from 'unoverlay-vue'
import App from './App.vue'

const app = createApp(App)
app.use(unoverlay)
app.mount('#app')
```

## 📖 基本使用

定义弹出层组件

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
  // 如果您想将其用作 template 中的组件使用,
  // 你需要在 props 中定义 visible 字段
  visible: Boolean
})

// 定义组件中使用的事件（可选）
// 在组件中使用会有事件提示
defineEmits(['cancel', 'confirm'])

// 从 useOverlayMeta 获取 Overlay 信息
const { visible, confirm, cancel } = useOverlayMeta({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
  // 仅在 template 中使用则不需要定义
  animation: 1000
})
</script>

<template>
  <div v-if="visible" @click="confirm(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

创建回调, 在 `Javascript` / `Typescript` 中调用

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

// 转换为命令式回调
const callback = createOverlay(OverlayComponent)
// 调用组件并获取 confirm 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

或在 `setup` 中调用

```ts
import { renderOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```

或在 `template` 中调用

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
  <overlay-component
    v-model:visible="visible"
    @confirm="confirm"
    @cancel="cancel"
  />
</template>
```

你可以大胆地发挥你的想象力，unoverlay-vue 可以让你实现大部分关于弹出层的组件！

> 如果您想了解更多高级功能，您可以查看 unoverlay-vue 的 [详细文档](https://tuimao233.github.io/unoverlay-vue/zh/)

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
