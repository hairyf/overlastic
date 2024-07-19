# Globals Functions

`@overlastic/core` provides built-in tools for defining and creating global elements and mapping their hierarchical relationships.

## defineGlobalElement

Defines a mounting node, which is by default mounted in `document.body`. You can pass in a `root` parameter to define a mounting element, or pass in `false` to avoid mounting.

```ts
import { defineGlobalElement } from '@overlastic/core'

const divElement = defineGlobalElement('global-div')
// body: { <div id="global-div"> }
// divElement.id >> global-div

// Pass in false to avoid mounting
const divElement2 = defineGlobalElement('global-div-2', false)
```

## defineName

Defines a name (id) for a mounting element. By default, an index is automatically appended to the end of the name.

```ts
import { defineName } from '@overlastic/core'

const name1 = defineName() // unified-overlay--1
const name2 = defineName('my-id') // my-id--1
const name3 = defineName('my-id2', false) // my-id2
```

## getIndex

Gets the index of the current name, which is used internally by `@overlastic/core` for passing the index property.

```ts
defineName() // unified-overlay--1
getIndex() // 1
defineName() // unified-overlay--2
getIndex() // 2

defineName('my-id')
getIndex('my-id') // 1
defineName('my-id')
getIndex('my-id') // 2

defineName('my-id2', false)
defineName('my-id2', false)
getIndex('my-id2') // 0
```
