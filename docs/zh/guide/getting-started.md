# Getting Started

> Unoverlay Vue 仅支持 Vue3 | Vue2 Composition-api

你可以通过命令行工具进行安装 Unoverlay Vue

## Install

With pnpm: 
```sh
pnpm add unoverlay-vue
```

With yarn:
```sh
yarn add unoverlay-vue
```

## Global

您可以全局注册 Unoverlay Vue, 这将为所有的弹出层继承应用上下文。

```ts
// main.js
import { createApp } from 'vue-demi'
import unoverlay from 'unoverlay-vue'

const app = createApp({})
app.use(unoverlay)
```

## Usage



### 步骤.1: Define Component

Unoverlay Vue 适用于绝大多数组件，使用 `useOverlayMeta` 能对组件流程有更细致的控制。

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
})

// 定义组件中使用的事件（可选）
// 在组件中使用会有事件提示
defineEmits(['cancel', 'confirm'])

// 从 useOverlayMeta 获取 Overlay 信息
const { visible, confirm, cancel } = useOverlayMeta({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
  animation: 1000,
})
</script>

<template>
  <div v-if="visible" @click="confirm(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

### 步骤.2: Create Overlay

你可以通过 `createOverlay` 的方法将组件转换成模态框的方法，它允许你在 `Javascript` / `Typescript` 中调用。

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

// 转换为命令式回调
const callback = createOverlay(OverlayComponent)
// 调用组件并获取 confirm 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接调起组件，跳过 `createOverlay` 方法。

```ts
import { renderOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```
