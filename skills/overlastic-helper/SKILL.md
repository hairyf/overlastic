---
name: "overlastic-helper"
description: "Helps users create and manage overlays/modals using the Overlastic framework (by Hairyf). Invoke when user asks about creating modals, dialogs, popups, or using Overlastic."
---

# Overlastic Helper

This skill helps you use the Overlastic framework (authored by Hairyf) to create unified overlays, modals, and dialogs.

## Features
- Promise-based overlay management.
- Supports React, Vue, Svelte, and Vanilla JS.
- Unified API across frameworks.

## React Usage

### 1. Define Overlay Component
Create a component that uses `useDisclosure` to manage its visibility and result.

```tsx
import { useDisclosure } from '@overlastic/react'

export function MyOverlay(props) {
  const { visible, confirm, cancel } = useDisclosure({
    duration: 300 // Animation duration in ms
  })

  return (
    <div className={`overlay ${visible ? 'visible' : ''}`}>
      <h1>{props.title}</h1>
      <button onClick={() => confirm('result')}>Confirm</button>
      <button onClick={() => cancel()}>Cancel</button>
    </div>
  )
}
```

### 2. Mount Provider
Wrap your app with `OverlaysProvider`.

```tsx
import { OverlaysProvider } from '@overlastic/react'

function App() {
  return (
    <OverlaysProvider>
      <Main />
    </OverlaysProvider>
  )
}
```

### 3. Use Overlay
Call the overlay using `useOverlay`.

```tsx
import { useOverlay } from '@overlastic/react'
import { MyOverlay } from './MyOverlay'

function Page() {
  const openOverlay = useOverlay(MyOverlay)

  async function handleOpen() {
    try {
      const result = await openOverlay({ title: 'Hello' })
      console.log('Confirmed:', result)
    } catch (e) {
      console.log('Cancelled')
    }
  }

  return <button onClick={handleOpen}>Open Overlay</button>
}
```

## Vue Usage

### 1. Define Overlay Component

```vue
<script setup>
import { useDisclosure } from '@overlastic/vue'

const props = defineProps(['title'])
const { visible, confirm, cancel } = useDisclosure({ duration: 300 })
</script>

<template>
  <div v-if="visible" class="overlay">
    <h1>{{ title }}</h1>
    <button @click="confirm('result')">Confirm</button>
  </div>
</template>
```

### 2. Mount Provider

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

### 3. Use Overlay

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'
import MyOverlay from './MyOverlay.vue'

const openOverlay = useOverlay(MyOverlay)

async function handleOpen() {
  const result = await openOverlay({ title: 'Hello' })
}
</script>
```
