# Getting Started

@overlays/vue is used to define Overlay components in Vue3 and supports both imperative and declarative usage!

## Installation

Use [vue-demi](https://github.com/vueuse/vue-demi) to support the composition-api usage in Vue2 & 3!

> If you are using Vue version 2.7 or below, please install [@vue/composition-api](https://github.com/vuejs/composition-api#readme).
> 
> If you cannot use composition-api for some reason, use [@overlays/vue2](/zh/vue/vue2).

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

You can register overlays globally, which will inherit the application context for all popups.

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@overlays/vue'

const app = createApp({})
app.use(unoverlay)
```

## Usage



### Step 1: Define Component

overlays is suitable for most components. Using useOverlay can provide finer control over the component process.

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlay } from '@overlays/vue'
const props = defineProps({
  title: String,
})
// Get Overlay information from useOverlay
const { visible, resolve, reject } = useOverlay({
  // Duration of overlay duration to avoid premature destruction of the component
  duration: 1000,
})
</script>

<template>
  <div v-if="visible" @click="resolve(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

### Step 2: Create Overlay

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlays/vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also use `renderOverlay` to directly call the component and skip the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlays/vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```
