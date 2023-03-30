# Getting Started

> Unoverlays 仅支持 Vue3 | Vue2 Composition-api

## Install

With pnpm: 
```sh
pnpm add @unoverlays/vue
```

With yarn:
```sh
yarn add @unoverlays/vue
```

## Global

您可以全局注册 Unoverlays, 这将为所有的弹出层继承应用上下文。

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@unoverlays/vue'

const app = createApp({})
app.use(unoverlay)
```

## Usage



### 步骤.1: Define Component

Unoverlays 适用于绝大多数组件，使用 `useOverlayMeta` 能对组件流程有更细致的控制。

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from '@unoverlays/vue'
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

你可以通过 `defineOverlay` 的方法将组件转换成模态框的方法，它允许你在 `Javascript` / `Typescript` 中调用。

```ts
import { defineOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

// 转换为命令式回调
const callback = defineOverlay(OverlayComponent)
// 调用组件并获取 confirm 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接调起组件，跳过 `defineOverlay` 方法。

```ts
import { renderOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```
