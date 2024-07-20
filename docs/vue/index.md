# @overlastic/vue

@overlastic/vue is used to define pop-up components in Vue3 and supports callbacks and usage in templates.

## Installation

Use `vue-demi` to support composition-api usage in Vue2 & 3!

> If you are using Vue version below 2.7, please install [@vue/composition-api](https://github.com/vuejs/composition-api#readme)
>
> If you are unable to use composition-api for some reason, use [@overlastic/vue2](/zh/vue/vue2)

::: code-group

```bash [npm]
npm install @overlastic/vue
```

```bash [yarn]
yarn add @overlastic/vue
```

```bash [pnpm]
pnpm add @overlastic/vue
```

:::

## Usage

### Step 1: Define Component

Use `useExtendOverlay` to define a pop-up component, which returns the following:

- `resolve|reject` returns the result of a Promise, which will destroy the component when `duration` ends
- `visible` is used to display the component, executing the `Promise` result immediately

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue'
import { useExtendOverlay } from '@overlastic/vue'
const props = defineProps({
  title: String,
})

// Get Overlay information from useExtendOverlay
const { visible, resolve, reject } = useExtendOverlay({
  // Duration of pop-up animation, prevents premature destruction of the component
  duration: 1000,
})
</script>

<template>
  <div v-if="visible" @click="resolve(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

### Step 2: Create Pop-up

Use the `defineOverlay` method to convert the component into a modal dialog, allowing you to call it in your Javascript/Typescript.

```ts
import { defineOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

// Convert to a callback method
const callback = defineOverlay(Overlay)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also directly render the component using `renderOverlay` and skip the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

const value = await renderOverlay(Overlay, {
  title: 'useExtendOverlay'
})
// value === "useExtendOverlay:confirmed"
```

## Template

Components created using `@overlastic/vue`, besides supporting callback method invocation, still support usage in `<template>`, which is optional and very useful when migrating old components.

---

When using in `<template>`, you need to explicitly define `modal` and `event`

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useExtendOverlay } from '@overlastic/vue'
const props = defineProps({
  title: String,
  // When using in Template, define the field used by v-modal (defaults to visible)
  visible: Boolean
})

// Define the event types used in the component (defaults: reject, resolve)
defineEmits(['reject', 'resolve'])

const { visible, resolve, reject } = useExtendOverlay()
</script>
```

After defining the parameters, you can use the pop-up component in the template.

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

If you want to replace with other fields and event names, you can change the `events` and `model` configurations.

```ts
const props = defineProps({
  title: String,
  modalValue: Boolean
})

defineEmits(['nook', 'ok'])

const { visible, resolve, reject } = useExtendOverlay({
  events: { resolve: 'ok', reject: 'nook' },
  model: 'modalValue',
})
```
