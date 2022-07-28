# Getting Started

> Unoverlay Vue is generated with Vue's Composition api, so it only supports Vue3 | Vue2 Composition-api

You can install `Unoverlay Vue` by opening your terminal in your project and running the following command:

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

You can register Unoverlay Vue globally, it will inherit the application context for all popup layers, of course, it is optional, everything is up to you.

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from 'unoverlay-vue'

const app = createApp({})
app.use(unoverlay)
```

## Usage

You can use your imagination boldly!

### Step.1: Define Component

Unoverlay Vue is suitable for most components, using `useOverlayMeta` can have more fine-grained control over component flow.

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

### Step.2-1: Create Overlay

You can convert a component into a modal with the `createOverlay` method, which allows you to call in `Javascript` / `Typescript`

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative overlay
const callback = createOverlay(OverlayComponent)
// Call the component and get the value of confirm
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also invoke the component directly via `executeOverlay`, skipping the `createOverlay` method.

```ts
import { executeOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'

const value = await executeOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```

### Step.2-2: In Template

You can still use components in template and enjoy the advantages brought by template.

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

## Other

### Control the flow externally

If you give all control to Component, you will be limited in some usage scenarios. The components converted by Unoverlay Vue allow users to control the flow of components externally.

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

### 👆 App context inheritance

If you register Unoverlay Vue globally, it will automatically inherit your application context, and you can also pass in the context with finer control.

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


### ⌨️ Typescript

If you want the component to have the correct type declaration when called in the callback, you need to extract the props into a separate file, simple case:

- Step.1: Externally defined parameter type

```ts
export interface OverlayParams {
  title?: string
}
export type OverlayResolved = string
```

- Step.2: Components use parameter types

```vue
<!-- index.vue -->
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import type { OverlayParams, OverlayResolved } from './props'
const props = defineProps<OverlayParams>()
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>
```

- Step.3: 在使用 `createOverlay` 或 `executeOverlay` 时传入类型

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'
import type { OverlayParams, OverlayResolved } from './define.ts'

const callback = createOverlay<OverlayParams, OverlayResolved>(OverlayComponent)
```

> If you have requirements for vue's props runtime validation, you can define it like this: 

- Step.1: Externally defined parameter type

```ts
import type { ExtractInferTypes } from 'vue'
// define.ts
export const overlayProps = {
  title: String
}
export type OverlayParams = ExtractInferTypes<typeof overlayProps>
export type OverlayResolved = string
```

- Step.2: Components use parameter types

```vue
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import type { OverlayResolved } from './props'
import { overlayProps } from './props'
const props = defineProps(overlayProps)
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>
```

- Step.3: Consistent with the above, it is not described