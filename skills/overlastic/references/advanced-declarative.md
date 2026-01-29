---
name: declarative-usage
description: How to use overlays declaratively in templates and JSX
---

# Declarative Usage

Overlastic components support both imperative (callback) and declarative (template/JSX) usage, making migration from existing components easier.

## React Declarative Usage

Components can be used in JSX with props:

```tsx
import type { PropsWithOverlays } from '@overlastic/react'
import { useDisclosure } from '@overlastic/react'

export function OverlayComponent(props: PropsWithOverlays<{ title: string }>) {
  const { visible, confirm, cancel } = useDisclosure({
    props // Pass props to enable declarative mode
  })

  return (
    <div className={visible ? 'is-visible' : ''}>
      <h1>{props.title}</h1>
      <button onClick={() => confirm('ok')}>Confirm</button>
      <button onClick={() => cancel()}>Cancel</button>
    </div>
  )
}
```

Use in parent component:

```tsx
import { useState } from 'react'
import { OverlayComponent } from './overlay'

function Parent() {
  const [visible, setVisible] = useState(false)

  function onConfirm(value: any) {
    setVisible(false)
    console.log('Confirmed:', value)
  }

  function onCancel() {
    setVisible(false)
  }

  return (
    <>
      <button onClick={() => setVisible(true)}>Open</button>
      <OverlayComponent
        visible={visible}
        title="Hello"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  )
}
```

## Vue Declarative Usage

For template usage, explicitly define props and emits:

```vue
<script setup>
import { useDisclosure } from '@overlastic/vue'
import { defineProps, defineEmits } from 'vue-demi'

const props = defineProps({
  title: String,
  visible: Boolean // Required for v-model
})

defineEmits(['cancel', 'confirm'])

const { visible, confirm, cancel } = useDisclosure({
  model: 'visible',
  events: { confirm: 'confirm', cancel: 'cancel' }
})
</script>

<template>
  <div v-if="visible">
    <h1>{{ title }}</h1>
    <button @click="confirm('ok')">Confirm</button>
    <button @click="cancel()">Cancel</button>
  </div>
</template>
```

Use in parent:

```vue
<script setup>
import Overlay from './overlay.vue'
const visible = ref(false)

function onConfirm(value: any) {
  visible.value = false
  console.log('Confirmed:', value)
}

function onCancel() {
  visible.value = false
}
</script>

<template>
  <button @click="visible = true">Open</button>
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

```tsx
// React
interface ComponentProps {
  onOk?: (value?: any) => void
  onNook?: (value?: any) => void
  open: boolean
}

export function Component(props: ComponentProps) {
  const { visible, confirm, cancel } = useDisclosure({
    events: { confirm: 'onOk', cancel: 'onNook' },
    model: 'open',
    props
  })
  // ...
}
```

```vue
<!-- Vue -->
<script setup>
const props = defineProps({
  modalValue: Boolean
})

defineEmits(['ok', 'nook'])

const { visible, confirm, cancel } = useDisclosure({
  events: { confirm: 'ok', cancel: 'nook' },
  model: 'modalValue'
})
</script>
```

## Migration Pattern

This pattern is useful when migrating existing components:

1. **Add useDisclosure**: Add hook to existing component
2. **Keep Props**: Maintain existing prop interface
3. **Dual Mode**: Component works in both imperative and declarative modes
4. **Gradual Migration**: Migrate call sites one at a time

## Key Points

* **Props Required**: For declarative mode, pass `props` to `useDisclosure` options.
* **Event Names**: Default events are `confirm` and `cancel`, but can be customized.
* **Model Name**: Default model is `visible`, but can be changed with `model` option.
* **Type Safety**: Use `PropsWithOverlays<T>` type for proper TypeScript support in React.
* **Dual Compatibility**: Components work in both modes simultaneously, enabling gradual migration.
