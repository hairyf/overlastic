---
name: provider-pattern
description: How to use OverlaysProvider for context inheritance
---

# Provider Pattern

The `OverlaysProvider` component enables overlay components to inherit application context without manually placing holders in the component tree.

## Why Provider?

When using `useOverlay`, you typically need to place a `holder` in the component tree. The `OverlaysProvider` automatically manages this and allows all overlays to inherit context from the application root.

## React Usage

```tsx
import { OverlaysProvider } from '@overlastic/react'

function App() {
  return (
    <OverlaysProvider>
      <YourApp />
    </OverlaysProvider>
  )
}
```

With provider, you can use `useOverlay` anywhere in your app:

```tsx
import { useOverlay } from '@overlastic/react'
import CustomDialog from './Dialog.tsx'

function Page() {
  const openDialog = useOverlay(CustomDialog)

  async function onClick() {
    const result = await openDialog({ title: 'My Title' })
    console.log(result)
  }

  return <button onClick={onClick}>Open Modal</button>
}
```

## Vue Usage

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

Use `useOverlay` in any component:

```vue
<script setup>
import { useOverlay } from '@overlastic/vue'
import CustomDialog from './Dialog.vue'

const openDialog = useOverlay(CustomDialog)

async function onClick() {
  const result = await openDialog({ title: 'My Title' })
  console.log(result)
}
</script>

<template>
  <button @click="onClick">Open Modal</button>
</template>
```

## Benefits

- **Context Inheritance**: Overlays automatically inherit React/Vue context (themes, stores, etc.)
- **Devtools Support**: Components appear in React DevTools or Vue DevTools
- **No Manual Holders**: Eliminates need to place holder components manually
- **Global Access**: Use `useOverlay` from any component without prop drilling

## Key Points

* **Root Placement**: Provider should be mounted at the application root for maximum context inheritance.
* **Devtools**: Provider mode enables proper DevTools integration for debugging.
* **Alternative**: Without provider, use `defineOverlay`/`renderOverlay` but lose context inheritance.
* **Svelte**: Svelte doesn't require a provider component due to its different context model.
