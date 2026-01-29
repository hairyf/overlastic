---
name: useDisclosure
description: How to use useDisclosure hook for overlay lifecycle management
---

# useDisclosure

`useDisclosure` is a composable hook that manages overlay lifecycle and state. It returns methods and reactive state for controlling overlay display and resolution.

## Basic Usage

```typescript
import { useDisclosure } from '@overlastic/react' // or '@overlastic/vue'

const { visible, confirm, cancel, vanish } = useDisclosure({
  duration: 1000, // Animation duration to prevent premature destruction
  immediate: true  // Set visible to true immediately
})

// In component
return (
  <div className={visible ? 'is-visible' : ''}>
    <button onClick={() => confirm('result')}>Confirm</button>
    <button onClick={() => cancel('error')}>Cancel</button>
  </div>
)
```

## Options

- `duration`: Number of milliseconds to wait before destroying component after confirm/cancel (default: 0)
- `immediate`: Whether to set visible to true immediately on mount (default: true)
- `model`: v-model field name for declarative usage (default: 'visible')
- `events`: Custom event names for template usage
  - `confirm`: Event name for confirm (default: 'confirm')
  - `cancel`: Event name for cancel (default: 'cancel')
  - `close`: Event name for close (default: 'close')
- `automatic`: Whether to automatically handle component destruction (default: true)

## Return Values

- `visible`: Reactive boolean for controlling overlay display
- `confirm(value)`: Resolves the deferred and hides overlay after duration
- `cancel(reason)`: Rejects the deferred and hides overlay after duration
- `close()`: Closes overlay without a value
- `vanish()`: Immediately destroys the component instance
- `deferred`: The underlying deferred promise (when used imperatively)

## Declarative Usage

When using in templates, define props and emits:

```typescript
// Vue example
const props = defineProps({
  visible: Boolean
})

defineEmits(['confirm', 'cancel'])

const { visible, confirm, cancel } = useDisclosure({
  model: 'visible',
  events: { confirm: 'confirm', cancel: 'cancel' }
})
```

## Key Points

* **Duration Purpose**: The duration prevents components from being destroyed before animations complete.
* **Automatic Cleanup**: When `automatic: true`, components are automatically destroyed after deferred resolves/rejects.
* **Dual Mode**: Works in both imperative (callback) and declarative (template) modes.
* **Context Inheritance**: When used with `OverlaysProvider`, components inherit application context automatically.
