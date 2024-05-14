# Getting Started

> overlays only supports Vue3 | Vue2 Composition-api

## Install

With pnpm: 
```sh
pnpm add @overlastic/vue
```

With yarn:
```sh
yarn add @overlastic/vue
```

## Global

You can register overlays globally, which will inherit the application context for all popups.

```ts
// main.js
import Vue from 'vue'
import unoverlay from '@overlastic/vue'

const app = new Vue({})
app.use(unoverlay)
```

## Usage



### Step 1: Define Component

overlays is suitable for most components. Using usePrograms can provide finer control over the component process.

```vue
<!-- overlay.vue -->
<script>
import { usePrograms } from '@overlastic/vue2'
export default {
  mixins: [usePrograms({ duration: 1000 })],
  methods: {
    onClick() {
      // use this.$visible
      // use this.$resolve or this.$reject
    }
  }
}
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
import { defineOverlay } from '@overlastic/vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also use `renderOverlay` to directly call the component and skip the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlastic/vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  title: 'usePrograms'
})
// value === "usePrograms:confirmed"
```
