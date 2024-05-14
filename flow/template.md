You can use [@overlastic/vue](https://unoverlays.vercel.app/en/vue/) to create components, reduce component DTL syntax through customization, and use function calls.

```html
<!-- overlay.vue -->
<script setup>
import { defineProps } from 'vue'
import { usePrograms } from '@overlastic/vue'
const props = defineProps({
  content: String,
})
// Get overlay information from usePrograms
const { visible, resolve, reject } = usePrograms({
  // Duration of the overlay duration to avoid premature component destruction
  duration: 1000,
})
</script>

<template>
  <!-- Customized modal using vuetify -->
  <v-dialog v-model="visible">
    <div>{{ content }}</div>

    <button @click="resolve(`${content}:confirmed`)"> click confirm </button>
  </v-dialog>
</template>
```

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlastic/vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the resolve callback
const value = await callback({ content: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can register overlays globally, which will inherit the application context for all popups.

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@overlastic/vue'

const app = createApp({})
app.use(unoverlay)
```

or you can also pass in the context with finer control.

```ts
import { renderOverlay } from '@overlastic/vue'
import { getCurrentInstance } from 'vue-demi'
import Component from './overlay.vue'

// in your setup method
const { appContext } = getCurrentInstance()!
renderOverlay(Component, props, {
  appContext
})
```