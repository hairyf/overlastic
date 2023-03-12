# Getting Started

> Unoverlays is generated with Vue's Composition api, so it only supports Vue3 | Vue2 Composition-api

You can install `Unoverlays` by opening your terminal in your project and running the following command:

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

You can register Unoverlays globally, it will inherit the application context for all popup layers, of course, it is optional, everything is up to you.

```ts
// main.js
import { createApp } from 'vue-demi'
import unoverlay from '@unoverlays/vue'

const app = createApp({})
app.use(unoverlay)
```

## Usage

You can use your imagination boldly!

### Step.1: Define Component

Unoverlays is suitable for most components, using `useOverlayMeta` can have more fine-grained control over component flow.

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
const props = defineProps({
  title: String,
})

// Get Overlay information from useOverlayMeta
const { visible, confirm, cancel } = useOverlayMeta({
  // Animation duration to avoid premature destruction of components
  animation: 1000
})
</script>

<template>
  <div v-if="visible" @click="confirm(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

### Step.2-1: Create Overlay

You can convert a component into a modal with the `createOverlay` method, which allows you to call in `Javascript` / `Typescript`

```ts
import { createOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative overlay
const callback = createOverlay(OverlayComponent)
// Call the component and get the value of confirm
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also invoke the component directly via `renderOverlay`, skipping the `createOverlay` method.

```ts
import { renderOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```
