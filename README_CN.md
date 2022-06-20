# unoverlay-vue

![image](https://user-images.githubusercontent.com/1655312/70054926-8d469d80-15e9-11ea-9fdc-c8f65bf9bc85.png)

> Oh, this image is from [vuejs-overlay](https://github.com/fattihkoca/vuejs-overlay), but he's really cool and I'm lazy so I stole it (sorry)

> 中文 | [English](./README.md)

通用的弹出层 Vue2/3 工具

他可以做这些事情: 

- 制作类似于 `element-plus/naiveui/vuetifyjs/vant`... 的 [Message](https://element.eleme.cn/#/en-US/component/message) 或 [Dialog](https://element.eleme.cn/#/en-US/component/dialog)
- 同时支持两种调用方式（组件或javascript-api）
- 使用现有组件库（如 element-plus）集成和定制化功能

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
import App from './App.vue'
import unoverlay from 'unoverlay-vue'

const app = createApp(App)
app.use(unoverlay)
app.mount('#app')
```

## 📖 基本使用

定义弹出层组件

```vue
<!-- overlay.vue -->
<template>
  <div v-if="visible" @click="confirm(title + ':confirmed')"> {{ title }} </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
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
  // 仅在 template 中使用 component 则不需要定义
  animation: 1000
})
</script>
```

创建回调, 在 `Javascript` / `Typescript` 中调用

```ts
import { transformOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

// 转换为命令式回调
const callback = transformOverlay(OverlayComponent)
// 调用组件并获取 confirm 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

或在 `setup` 中调用

```ts
import { useOverlayComp } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const value = await useOverlayComp(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```

或在 `template` 中调用

```vue
<!-- overlay.vue -->
<template>
  <overlay-component
    v-model:visible="visible"
    @confirm="confirm"
    @cancel="cancel"
  >
  </overlay-component>
</template>
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
```

你可以大胆地发挥你的想象力！

## 🏔️ 定制化弹出层

以[element-plus@2.15.7(dialog)](https://element.eleme.cn/#/zh-CN/component/dialog)为例（你也可以使用其他组件库）

```vue
<!-- overlay.vue -->
<template>
  <el-dialog :title="title" :visible.sync="visible" @close="cancel()">
    <!-- 你的定制化内容 -->
    <button @click="confirm(title + ':confirmed')"></button>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
})

const { visible, confirm, cancel } = useOverlayMeta({
  animation: 1000
})
</script>
```

```ts
import { transformOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const callback = transformOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```

## ⌨️ Typescript

如果您希望组件在回调中调用时具有正确的类型声明，

您需要将 `props` 提取到一个单独的文件中，简单的案例：

```ts
export interface OverlayParams {
  title?: string
}
export type OverlayResolved = string
```

在 .vue 中使用

```vue
<!-- index.vue -->
<template>
  <div v-if="visible" @click="confirm('string')"> {{ title }} </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import { OverlayParams, OverlayResolved } from './props'
const props = defineProps<OverlayParams>()
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>
```

在另外一个 ts 文件中处理

```ts
import { transformOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'
import type { OverlayParams, OverlayResolved } from './define.ts'

const callback = transformOverlay<OverlayParams, OverlayResolved>(OverlayComponent)
```

> 如果你对 vue 的 props 运行时验证有需求，可以这样定义：

```ts
import type { ExtractInferTypes } from 'vue'
// define.ts
export const overlayProps = {
  title: String
}
export type OverlayParams = ExtractInferTypes<typeof overlayProps>
export type OverlayResolved = string
```

```vue
<!-- index.vue -->
<template>
  <div v-if="visible" @click="confirm('string')"> {{ title }} </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import { overlayProps, OverlayResolved } from './props'
const props = defineProps(overlayProps)
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>
```

## 继承应用上下文

> 如果你全局注册了 `unoverlay-vue` ，它会自动继承你的应用上下文。

```ts
import Component from './overlay.vue'
import { getCurrentInstance } from 'vue'

// 在你的 setup 中
const { appContext } = getCurrentInstance()!
useOverlayComp(Component, {
  props: {},
  appContext
})
```

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
