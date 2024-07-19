# @overlastic/vue

@overlastic/vue 用于在 Vue3 中定义 Overlays 组件，并支持命令式与声明式的使用！

## Installation

通过 `vue-demi` 从而支持 Vue2 & 3 中 composition-api 用法！

> 如果您使用 Vue2.7 版本以下，请安装 [@vue/composition-api](https://github.com/vuejs/composition-api#readme)
>
> 如果您因为某些原因无法使用 composition-api，请使用 [@overlastic/vue2](/zh/vue/vue2)

## Install

With pnpm:
```sh
pnpm add @overlastic/vue
```

With yarn:
```sh
yarn add @overlastic/vue
```

## Usage

### 步骤.1: Define Component

overlays 适用于绝大多数组件，使用 `useOverlayDefine` 能对组件流程有更细致的控制。

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayDefine } from '@overlastic/vue'
const props = defineProps({
  title: String,
})

// 从 useOverlayDefine 获取 Overlay 信息
const { visible, resolve, reject } = useOverlayDefine({
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
import { defineOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

// 转换为命令式回调
const callback = defineOverlay(Overlay)
// 调用组件并获取 resolve 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接调起组件，跳过 `defineOverlay` 方法。

```ts
import { renderOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

const value = await renderOverlay(Overlay, {
  title: 'useOverlayDefine'
})
// value === "useOverlayDefine:confirmed"
```

## Define Component

使用 `@overlastic/vue` 创建的组件，除了支持使用命令式（Imperative）方法调用外，还支持在 `<template>` 中使用，这是一个可选项，在迁移旧组件时非常有用。

在 `<template>` 中使用，需要显式定义 `modal` 与 `event`

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayDefine } from '@overlastic/vue'
const props = defineProps({
  title: String,
  // 在 Template 中使用，需要定义 v-modal 所使用的字段（默认对应 visible）
  visible: Boolean
})

// 定义组件中使用的事件类型（默认：reject、resolve）
defineEmits(['reject', 'resolve'])

const { visible, resolve, reject } = useOverlayDefine()
</script>
```

参数定义后，即可在 template 中使用弹出层组件。

```vue
<script setup>
import Overlay from './overlay.vue'
const visible = ref(false)

function resolve(value) {
  // ...
}
function reject(value) {
  // ...
}
</script>

<template>
  <Overlay v-model:visible="visible" title="Hairyf" @resolve="resolve" @reject="reject" />
</template>
```

如果您想替换为其他的字段与事件名，可以更改 `events` 与 `model` 配置。

```ts
const props = defineProps({
  title: String,
  modalValue: Boolean
})

defineEmits(['nook', 'ok'])

const { visible, resolve, reject } = useOverlayDefine({
  events: { resolve: 'ok', reject: 'nook' },
  model: 'modalValue',
})
```
