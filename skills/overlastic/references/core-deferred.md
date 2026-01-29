---
name: deferred
description: How to use deferred promises for overlay control
---

# Deferred

`deferred` is a variation of `Promise` that adds `confirm` and `cancel` methods, making it easy to control the promise flow externally.

## Usage

Typically, you don't need to create deferreds manually—they're automatically created by constructors. However, you can create them directly:

```typescript
import { createDeferred } from '@overlastic/core'

const deferred = createDeferred<string>()

deferred.then((value) => {
  console.log(value) // "yes!"
})

deferred.confirm('yes!')

// Or await it
const result = await deferred // "yes!"
```

## Methods

- `confirm(value)`: Resolves the promise with the given value
- `cancel(reason)`: Rejects the promise with the given reason
- `close()`: Resolves the promise without a value (equivalent to `confirm()`)
- `then/catch/finally`: Standard Promise methods

## Key Points

* **Automatic Creation**: Constructors automatically create deferreds and pass them to components via props.
* **Component Integration**: Components should call `deferred.confirm()` or `deferred.cancel()` to end the overlay lifecycle.
* **Cleanup**: Use `deferred.finally()` to perform cleanup operations when the overlay ends.
* **Type Safety**: Use generics to type the resolved value: `createDeferred<string>()` ensures `confirm()` accepts a string.
