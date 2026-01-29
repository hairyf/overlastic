---
name: global-functions
description: How to use global element and name management utilities
---

# Global Functions

`@overlastic/core` provides built-in tools for defining and creating global elements and mapping their hierarchical relationships.

## defineGlobalElement

Defines a mounting node, defaulting to `document.body`. Pass `false` as the second parameter to avoid mounting.

```typescript
import { defineGlobalElement } from '@overlastic/core'

// Mounts to document.body by default
const divElement = defineGlobalElement('global-div')
// Result: <div id="global-div"></div> in body
// divElement.id === 'global-div'

// Avoid mounting
const divElement2 = defineGlobalElement('global-div-2', false)
```

You can also specify a custom root element:

```typescript
const customRoot = document.getElementById('app')
const element = defineGlobalElement('my-overlay', customRoot)
```

## defineName

Defines a name (ID) for a mounting element. By default, an index is automatically appended.

```typescript
import { defineName } from '@overlastic/core'

const name1 = defineName() // "unified-overlay--1"
const name2 = defineName() // "unified-overlay--2"
const name3 = defineName('my-id') // "my-id--1"
const name4 = defineName('my-id', false) // "my-id" (no auto-increment)
```

## getIndex

Gets the index of the current name, used internally for passing the index property.

```typescript
import { defineName, getIndex } from '@overlastic/core'

defineName() // "unified-overlay--1"
getIndex() // 1

defineName('my-id') // "my-id--1"
getIndex('my-id') // 1

defineName('my-id', false) // "my-id"
getIndex('my-id') // 0 (no increment when autoIncrement is false)
```

## Key Points

* **Auto-increment**: By default, names automatically append an index to prevent ID conflicts.
* **Index Tracking**: Each name prefix maintains its own index counter.
* **Mounting Control**: Use `false` as the root parameter to create elements without mounting them.
* **Internal Use**: These functions are primarily used internally by constructors, but can be used for custom implementations.
