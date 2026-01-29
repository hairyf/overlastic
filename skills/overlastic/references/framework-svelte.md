---
name: svelte-integration
description: How to use Overlastic with Svelte components
---

# Svelte Integration

`@overlastic/svelte` provides Svelte-specific implementations for creating imperative overlays with context inheritance.

## Installation

```bash
pnpm add @overlastic/svelte
```

## Basic Workflow

### Step 1: Define Component

Use `useDisclosure` and wrap content in `<Overlay>` component:

```svelte
<script lang="ts">
  import { Overlay, useDisclosure } from '@overlastic/svelte'
  import { fly } from 'svelte/transition'

  export let title: number
  export let duration = 200

  const { confirm, cancel } = useDisclosure({ duration })

  function onClick() {
    confirm(`${title}:confirmed`)
  }
</script>

<Overlay>
  <div
    transition:fly={{ opacity: 0, duration }}
    on:click={onClick}
  >
    <slot name="title">
      {title}
    </slot>
  </div>
</Overlay>
```

### Step 2: Create Overlay

Use `defineOverlay` or `renderOverlay` to create imperative callbacks:

```typescript
import { defineOverlay, renderOverlay } from '@overlastic/svelte'
import OverlayComponent from './overlay.svelte'

// Option 1: Define then call
const callback = defineOverlay(OverlayComponent)
const value = await callback({ title: 'Hello' })
// value === "Hello:confirmed"

// Option 2: Direct render
const value = await renderOverlay(OverlayComponent, {
  title: 'Hello'
})
```

## Controlled Mode

By default, `visible` is controlled by the `Overlay` component. For manual control:

```svelte
<script lang="ts">
  import { Overlay, useDisclosure } from '@overlastic/svelte'

  let visible = false

  const { confirm, cancel, deferred, vanish } = useDisclosure({
    duration: false,  // Disable auto-destruction
    immediate: false  // Don't set visible immediately
  })

  // Manually handle cleanup
  deferred.finally(() => vanish())
</script>

<Overlay bind:visible={visible}>
  <div on:click={() => confirm(`${title}:confirmed`)}>
    <!-- content -->
  </div>
</Overlay>
```

## Key Points

* **Overlay Component**: Must wrap content in `<Overlay>` component for proper lifecycle management.
* **Transitions**: Works seamlessly with Svelte transitions like `fly`, `fade`, etc.
* **Controlled Mode**: Set `duration: false` and `immediate: false` for manual control.
* **Context Inheritance**: Automatically inherits Svelte context when used within component tree.
* **No Provider**: Svelte doesn't require a provider component like React/Vue.
