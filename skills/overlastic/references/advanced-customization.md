---
name: custom-components
description: How to integrate existing component libraries with Overlastic
---

# Custom Components

You can wrap existing component library components (Ant Design, Element Plus, Material-UI, etc.) to make them work with Overlastic's promise-based API.

## React Example: Ant Design Drawer

```tsx
import type { PropsWithOverlays } from '@overlastic/react'
import { useDisclosure } from '@overlastic/react'
import { Button, Drawer } from 'antd'

function MyDrawer(props: PropsWithOverlays<{ title: string }>) {
  const { visible, confirm, cancel } = useDisclosure({
    duration: 200,
    props
  })

  return (
    <Drawer
      title={props.title}
      onClose={cancel}
      open={visible}
    >
      {/* Custom content */}
      <Button
        type="primary"
        onClick={() => confirm(`${props.title}:confirmed`)}
      >
        Confirm
      </Button>
    </Drawer>
  )
}

export default MyDrawer
```

Usage:

```tsx
import { defineOverlay } from '@overlastic/react'
import MyDrawer from './MyDrawer'

const openDrawer = defineOverlay(MyDrawer)
const result = await openDrawer({ title: 'My Drawer' })
```

## Vue Example: Element Plus Dialog

```vue
<script setup>
import { useDisclosure } from '@overlastic/vue'
import { defineProps } from 'vue-demi'

const props = defineProps({
  title: String
})

const { visible, confirm, cancel } = useDisclosure({
  duration: 1000
})
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    @close="cancel()"
  >
    <!-- your content -->
    <button @click="confirm(`${title}:confirmed`)">
      Confirm
    </button>
  </el-dialog>
</template>
```

Usage:

```typescript
import { defineOverlay } from '@overlastic/vue'
import OverlayComponent from './overlay.vue'

const callback = defineOverlay(OverlayComponent)
const value = await callback({ title: 'myElDialog' })
// value === "myElDialog:confirmed"
```

## Integration Pattern

1. **Wrap the Library Component**: Use the library's component as the base
2. **Connect useDisclosure**: Map `visible` to the library's open/visible prop
3. **Map Events**: Connect library's close/confirm events to `cancel`/`confirm`
4. **Set Duration**: Match duration to library's animation duration

## Key Points

* **Duration Matching**: Set `duration` to match the component library's animation duration to prevent premature destruction.
* **Event Mapping**: Map library-specific events (e.g., `onClose`, `onOk`) to `cancel`/`confirm`.
* **Props Forwarding**: Use `PropsWithOverlays` type to maintain type safety while forwarding props.
* **Library Compatibility**: Works with any component library that supports controlled open/close state.
