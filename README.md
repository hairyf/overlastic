# vue-overlays

![image](https://user-images.githubusercontent.com/1655312/70054926-8d469d80-15e9-11ea-9fdc-c8f65bf9bc85.png)

> Oh, this image is from [vuejs-overlay](https://github.com/fattihkoca/vuejs-overlay), but he's really cool and I'm lazy so I stole it (sorry)

> [中文](./README_CN.md) | English or see [github.io/unoverlay-vue](https://unoverlay-vue.vercel.app/)

A universal `overlay` (`popup`) `Vue2/Vue3` utils

it can achieve: 

- Make Message or Dialog similar to `element-plus` / `antd`...
- Supports two calling methods at the same time (template or js/ts)
- Integrate and customize functions using existing component libraries (such as element-plus)

## ⚙️ Install

```sh
pnpm add unoverlay-vue
# Or Yarn
yarn add unoverlay-vue
```

Global installation makes all overlay inherit the app context

```ts
// main.js
import { createApp } from 'vue-demi'
import unoverlay from '@unoverlays/vue'
import App from './App.vue'

const app = createApp(App)
app.use(unoverlay)
app.mount('#app')
```

## 📖 Usage(Basic)

define overlay component

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
const props = defineProps({
  title: String,
  // If you want to use it as a component in template,
  // you need to define visible in props
  visible: Boolean
})

// Define the events used in the component(optional)
// This allows you to use hints in components
defineEmits(['cancel', 'confirm'])

// Get Overlay information from useOverlayMeta
const { visible, confirm, cancel } = useOverlayMeta({
  // Animation duration to avoid premature destruction of components
  // Only use component in template and no need to define
  animation: 1000
})
</script>

<template>
  <div v-if="visible" @click="confirm(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

Create a callback, call it in `Javascript`/`Typescript`
```ts
import { createOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative overlay
const callback = createOverlay(OverlayComponent)
// Call the component and get the value of confirm
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

or use in `setup`

```ts
import { renderOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```

or use in component

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

You can use your imagination boldly!

If you want to know more advanced features, you can check the [detailed document](https://tuimao233.github.io/unoverlay-vue) of unoverlay-vue

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
