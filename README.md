# unoverlay-vue

![image](https://user-images.githubusercontent.com/1655312/70054926-8d469d80-15e9-11ea-9fdc-c8f65bf9bc85.png)

> Oh, this image is from [vuejs-overlay](https://github.com/fattihkoca/vuejs-overlay), but he's really cool and I'm lazy so I stole it (sorry)

> [中文](./README_CN.md) | English or see [github.io/unoverlay-vue](https://tuimao233.github.io/unoverlay-vue/)

A universal `overlay` (`popup`) `Vue2/Vue3` utils

it can achieve: 

- Make [Message](https://element.eleme.cn/#/en-US/component/message) or [Dialog](https://element.eleme.cn/#/en-US/component/dialog) similar to `element-plus` / `naiveui` / `vuetifyjs` / `vant`...
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
import { createApp } from 'vue'
import unoverlay from 'unoverlay-vue'
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
import { defineEmits, defineProps } from 'vue'
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

<template>
  <div v-if="visible" @click="confirm(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

Create a callback, call it in `Javascript`/`Typescript`
```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative overlay
const callback = createOverlay(OverlayComponent)
// Call the component and get the value of confirm
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

or use in `setup`

```ts
import { executeOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const value = await executeOverlay(OverlayComponent, {
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
  <overlay-component
    v-model:visible="visible"
    @confirm="confirm"
    @cancel="cancel"
  />
</template>
```

You can use your imagination boldly!

## 🏔️ Customized overlay

Take [element-plus@2.15.7(dialog)](https://element.eleme.cn/#/en-US/component/dialog) as an example (of course, you can use other component libraries)

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
})

const { visible, confirm, cancel } = useOverlayMeta({
  animation: 1000
})
</script>

<template>
  <el-dialog v-model:visible="visible" :title="title" @close="cancel()">
    <!-- your content -->
    <button @click="confirm(`${title}:confirmed`)" />
  </el-dialog>
</template>
```

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const callback = createOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```



## call `confirm` or `cancel` externally

The function of the return value of `Model` includes not only `Promise`, but also `confirm` and `cancel` based on this

```ts
const Model = createOverlay(MyComponent)
const promiser = Model({/* you props */})

function close() {
  promiser.cancel()
}
function yes() {
  promiser.confirm({/* you resolved value */})
}
```

> Since rendering needs to wait, `cancel / confirm` in promiser cannot be called immediately, and it is generally recommended to use it inside the callback function.

## App context inheritance

> If you globally registered `unoverlay-vue`, it will automatically inherit your app context.

```ts
import { getCurrentInstance } from 'vue'
import Component from './overlay.vue'

// in your setup method
const { appContext } = getCurrentInstance()!
executeOverlay(Component, {
  props: {},
  appContext
})
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
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import type { OverlayParams, OverlayResolved } from './props'
const props = defineProps<OverlayParams>()
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>

<template>
  <div v-if="visible" @click="confirm('string')">
    {{ title }}
  </div>
</template>
```

Handle in another separate .js

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'
import type { OverlayParams, OverlayResolved } from './define.ts'

// Convert to imperative overlay
const callback = createOverlay<OverlayParams, OverlayResolved>(OverlayComponent)
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
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import type { OverlayResolved } from './props'
import { overlayProps } from './props'
const props = defineProps(overlayProps)
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>

<template>
  <div v-if="visible" @click="confirm('string')">
    {{ title }}
  </div>
</template>
```

## API descriptions

### Type Declarations 

```ts
interface MountOverlayOptions {
  /** The dom node that hangs when rendering */
  root?: HTMLElement
  /** Used to inherit the current application context */
  appContext?: AppContext
}
interface UseOverlayMetaOptions {
  /** Animation duration to avoid premature destruction of components */
  animation?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}
```

### createOverlay

Used to convert the overlay component to a callable callback

```ts
const caller = createOverlay(Component)
caller({/* props */}, {/* MountOverlayOptions */})
```

### useOverlayMeta

Obtaining overlay information in the overlay component component is the core function of overlay-vue

```ts
useOverlayMeta({/* UseOverlayMetaOptions */})
```

### executeOverlay

Call overlay component directly

```ts
executeOverlay(Component, { props: {/* props */}, /*  MountOverlayOptions */ })
```

return types

```ts
interface OverlayMeta {
  /** Call resolve, change visible, and destroy when animation ends */
  cancel: Function
  /** Call reject, change visible, and destroy when animation ends */
  confirm: Function
  /** Destroy the current instance (immediately, and the call fails), only cancel is called in the template */
  vanish: Function
  /** Control overlay display and hide */
  visible: Ref<boolean>
  /** rendered vnode */
  vnode?: VNode
}
```
# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
