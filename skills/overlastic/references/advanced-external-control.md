---
name: external-control
description: How to control overlay lifecycle from outside the component
---

# External Control

Overlays return a deferred promise that includes `confirm` and `cancel` methods, allowing external control of the overlay lifecycle.

## Basic Pattern

When you call `defineOverlay` or `renderOverlay`, you get a deferred promise that you can control externally:

```typescript
import { defineOverlay } from '@overlastic/react'
import MyComponent from './MyComponent'

const openOverlay = defineOverlay(MyComponent)

// Call the overlay - returns a deferred promise
const instance = openOverlay({ title: 'Hello' })

// Control from outside
function handleClose() {
  instance.cancel('no')
  instance.catch((value) => {
    console.log(value) // "no"
  })
}

function handleConfirm() {
  instance.confirm('yes')
  instance.then((value) => {
    console.log(value) // "yes"
  })
}
```

## Use Cases

### Timeout Control

```typescript
const instance = openOverlay({ title: 'Confirm?' })

// Auto-cancel after 5 seconds
setTimeout(() => {
  instance.cancel('timeout')
}, 5000)

const result = await instance.catch((reason) => {
  if (reason === 'timeout') {
    console.log('User took too long')
  }
})
```

### Programmatic Control

```typescript
const instance = openOverlay({ title: 'Processing...' })

// Start async operation
async function processData() {
  try {
    const data = await fetchData()
    instance.confirm(data)
  } catch (error) {
    instance.cancel(error)
  }
}

processData()
const result = await instance
```

### Multiple Controls

```typescript
const instance = openOverlay({ title: 'Multi-step' })

// User can click button in component
// OR you can control externally
button1.onclick = () => instance.confirm('option1')
button2.onclick = () => instance.confirm('option2')
button3.onclick = () => instance.cancel('cancelled')

const result = await instance
```

## Important Notes

> Since rendering needs to wait, `cancel`/`confirm` in deferred cannot be called immediately. It's generally recommended to use them inside callback functions or after a short delay.

```typescript
// ❌ May not work - component not mounted yet
const instance = openOverlay({ title: 'Hello' })
instance.confirm('immediate') // Component may not be ready

// ✅ Better - wait for component to mount
const instance = openOverlay({ title: 'Hello' })
setTimeout(() => {
  instance.confirm('delayed')
}, 0)

// ✅ Best - use in event handler
const instance = openOverlay({ title: 'Hello' })
button.onclick = () => instance.confirm('clicked')
```

## Key Points

* **Deferred Methods**: The returned promise has `confirm()`, `cancel()`, and `close()` methods.
* **Timing**: Don't call deferred methods immediately after `openOverlay` - wait for component to mount.
* **Promise Chain**: You can use `.then()`, `.catch()`, and `.finally()` on the deferred.
* **External Triggers**: Useful for timeouts, programmatic control, or integration with external systems.
