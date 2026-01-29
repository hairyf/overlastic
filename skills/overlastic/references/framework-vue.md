---
name: vue-integration
description: How to use Overlastic with Vue 3 components
---

# Vue Integration

`@overlastic/vue` provides Vue 3-specific implementations using `vue-demi` for Vue 2 & 3 compatibility.

## Installation

```bash
pnpm add @overlastic/vue
```

> For Vue < 2.7, install `@vue/composition-api`. For non-composition-api usage, use `@overlastic/vue2`.

## Basic Workflow

### Step 1: Define Component

Use `useDisclosure` in component setup:

```vue
<script setup>
import { useDisclosure } from '@overlastic/vue'

const props = defineProps({
  title: String
})

const { visible, confirm, cancel } = useDisclosure({
  duration: 1000
})
</script>

<template>
  <div v-if="visible" @click="confirm(`${title}:confirmed`)">
    {{ title }}
  </div>
</template>
```

### Step 2: Mount Provider

Mount `OverlaysProvider` at root:

```vue
<script setup>
import { OverlaysProvider } from '@overlastic/vue'
</script>

<template>
  <OverlaysProvider>
    <App />
  </OverlaysProvider>
</template>
```

### Step 3: Call Overlay

Use `useOverlay` composable:

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

const openOverlay = useOverlay(Overlay)

async function handleClick() {
  const value = await openOverlay({ title: 'Hello' })
  console.log(value) // "Hello:confirmed"
}
</script>

<template>
  <button @click="handleClick">Open</button>
</template>
```

## Standalone Usage

Without provider:

```typescript
import { defineOverlay, renderOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

// Option 1: Define then call
const callback = defineOverlay(Overlay)
const value = await callback({ title: 'Hello' })

// Option 2: Direct render
const value = await renderOverlay(Overlay, { title: 'Hello' })
```

## Declarative Usage

For template usage, explicitly define props and emits:

```vue
<script setup>
import { useDisclosure } from '@overlastic/vue'

const props = defineProps({
  title: String,
  visible: Boolean // Required for v-model
})

defineEmits(['cancel', 'confirm'])

const { visible, confirm, cancel } = useDisclosure()
</script>
```

Use in parent template:

```vue
<script setup>
import Overlay from './overlay.vue'
const visible = ref(false)

function onConfirm(value) {
  visible.value = false
}
function onCancel() {
  visible.value = false
}
</script>

<template>
  <Overlay
    v-model:visible="visible"
    title="Hello"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>
```

## Custom Event Names

Customize event and model names:

```typescript
const props = defineProps({
  title: String,
  modalValue: Boolean
})

defineEmits(['ok', 'nook'])

const { visible, confirm, cancel } = useDisclosure({
  events: { confirm: 'ok', cancel: 'nook' },
  model: 'modalValue'
})
```

## Plugin Installation

You can install as a Vue plugin to access app context:

```typescript
import { createApp } from 'vue'
import Overlastic from '@overlastic/vue'

const app = createApp(App)
app.use(Overlastic)
```

## Key Points

* **vue-demi**: Uses `vue-demi` for Vue 2 & 3 compatibility via composition-api.
* **v-model Required**: For declarative usage, component must accept `visible` prop and emit update events.
* **Devtools Support**: Components appear in Vue DevTools when using provider or child-app mode.
* **Context Inheritance**: Provider automatically passes app context to overlay components.
