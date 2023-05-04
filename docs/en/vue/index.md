# @overlays/vue

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
  title: 'useOverlay'
})
// value === "useOverlay:confirmed"
```

## Define Component

To use a component created with `@overlays/vue`, it can be used not only with imperative methods, but also in `<template>`.

> This is an optional option that is very useful when porting old components.

To use it in `<template>`, `modal` and `event` must be explicitly defined.

```vue
<!-- Component.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlay } from '@overlays/vue'
const props = defineProps({
  title: String,
  // To use in Template, you need to define the field used by v-model (default corresponds to visible)
  visible: Boolean
})

// Define event types used in the component (default: reject, resolve)
defineEmits(['reject', 'resolve'])

const { visible, resolve, reject } = useOverlay({
  // If using template rendering, duration can be omitted
})
</script>
```

After defining the parameters, the overlay component can be used in the template.

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

If you want to replace them with other fields and event names, you can do so using the `model` and `events` config of useOverlay.

```ts
const props = defineProps({
  title: String,
  modalValue: Boolean
})

defineEmits(['nook', 'ok'])

const { visible, resolve, reject } = useOverlay({
  events: { resolve: 'ok', reject: 'nook' },
  model: 'modalValue',
})
```

## Typescript

You can ensure type safety by passing in the `props` and `resolved` parameters.

```ts
// types.ts
export interface DialogProps {
  title?: string
}
export type Resolved = string

// component setup
const props = defineProps<DialogProps>()
const { resolve, reject } = useOverlay<Resolved>()

// define overlay
const callback = defineOverlay<DialogProps, Resolved>(Component)
```

Of course, you can also use Vue's `ExtractInferTypes` to extract runtime `props` parameters.

```ts
import type { ExtractInferTypes } from 'vue-demi'
// types.ts
export const dialogProps = {
  title: String
}
export type DialogProps = ExtractInferTypes<typeof overlayProps>
// ...
// define overlay
const callback = defineOverlay<DialogProps, Resolved>(Component)
```