# unoverlay-vue

![image](https://user-images.githubusercontent.com/1655312/70054926-8d469d80-15e9-11ea-9fdc-c8f65bf9bc85.png)

> Oh, this image is from [vuejs-overlay](https://github.com/fattihkoca/vuejs-overlay), but he's really cool and I'm lazy so I stole it (sorry)

> [中文](./README_CN.md) | English

A universal `overlay` (`popup`) `Vue2/Vue3` utils

it can achieve: 

- Make [Message](https://element.eleme.cn/#/en-US/component/message) or [Dialog](https://element.eleme.cn/#/en-US/component/dialog) similar to `element-plus` / `naiveui` / `vuetifyjs` / `vant`...
- Supports two calling methods at the same time (component or javascript-api)
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
import { createApp } from 'vue'
import App from './App.vue'
import unoverlay from 'unoverlay-vue'

const app = createApp(App)
app.use(unoverlay)
app.mount('#app')
```

## 📖 Usage(Basic)

define overlay component

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
```

Create a callback, call it in `Javascript`/`Typescript`
```ts
import { transformOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative popup
const callback = transformOverlay(OverlayComponent)
// Call the component and get the value of confirm
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

or use in `setup`

```ts
import { useOverlayCall } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const value = await useOverlayCall(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```

or use in component

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

You can use your imagination boldly!

## 🏔️ Customized overlay

Take [element-plus@2.15.7(dialog)](https://element.eleme.cn/#/en-US/component/dialog) as an example (of course, you can use other component libraries)

```vue
<!-- overlay.vue -->
<template>
  <el-dialog :title="title" :visible.sync="visible" @close="cancel()">
    <!-- your content -->
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

If you want the component to have the correct type declaration when called in the callback,

You need to extract the props into a separate file, a simple case:

```ts
export interface OverlayParams {
  title?: string
}
export type OverlayResolved = string
```

Reference props in .vue

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

Handle in another separate .js

```ts
import { transformOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'
import type { OverlayParams, OverlayResolved } from './define.ts'

// Convert to imperative popup
const callback = transformOverlay<OverlayParams, OverlayResolved>(OverlayComponent)
```

> If you have requirements for vue's props runtime validation, you can define it like this: 

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

## App context inheritance

> If you globally registered `unoverlay-vue`, it will automatically inherit your app context.

```ts
import Component from './overlay.vue'
import { getCurrentInstance } from 'vue'

// in your setup method
const { appContext } = getCurrentInstance()!
useOverlayCall(Component, {
  props: {},
  appContext
})
```


# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
