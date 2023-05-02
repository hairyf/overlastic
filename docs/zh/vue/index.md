# Getting Started

@overlays/vue 用于在 Vue3 中定义 Overlays 组件，并支持命令式与声明式的使用！

## Installation

通过 `vue-demi` 从而支持 Vue2 & 3 中 composition-api 用法！

> 如果您使用 Vue2.7 版本以下，请安装 [@vue/composition-api](https://github.com/vuejs/composition-api#readme)
> 
> 如果您因为某些原因无法使用 composition-api，请使用 [@overlays/vue2](/zh/vue/vue2)

## Install

With pnpm: 
```sh
pnpm add @overlays/vue
```

With yarn:
```sh
yarn add @overlays/vue
```

## Global

您可以全局注册 overlays, 这将为所有的弹出层继承应用上下文。

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@overlays/vue'

const app = createApp({})
app.use(unoverlay)
```

## Usage



### 步骤.1: Define Component

overlays 适用于绝大多数组件，使用 `useOverlay` 能对组件流程有更细致的控制。

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlay } from '@overlays/vue'
const props = defineProps({
  title: String,
})

// 从 useOverlay 获取 Overlay 信息
const { visible, resolve, reject } = useOverlay({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
  duration: 1000,
})
</script>

<template>
  <div v-if="visible" @click="resolve(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

### 步骤.2: Create Overlay

你可以通过 `defineOverlay` 的方法将组件转换成模态框的方法，它允许你在 `Javascript` / `Typescript` 中调用。

```ts
import { defineOverlay } from '@overlays/vue'
import OverlayComponent from './overlay.vue'

// 转换为命令式回调
const callback = defineOverlay(OverlayComponent)
// 调用组件并获取 resolve 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接调起组件，跳过 `defineOverlay` 方法。

```ts
import { renderOverlay } from '@overlays/vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  title: 'useOverlay'
})
// value === "useOverlay:confirmed"
```
