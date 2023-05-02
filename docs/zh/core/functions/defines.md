# Globals Functions

`@overlays/core` 内置了全局元素的定义与创建，以及层级关系的映射相关的工具。

## defineGlobalElement

定义挂载节点，默认挂载 `document.body` 中，可传入 `root` 定义挂载元素，或者传入 `false` 不进行挂载。

```ts
import { defineGlobalElement } from '@overlays/core'

const divElement = defineGlobalElement('global-div')
// body: { <div id="global-div"> }
// divElement.id >> global-div

// root 传入 false 不进行挂载
const divElement2 = defineGlobalElement('global-div-2', false)
```

## defineName

用于定义挂载元素的名称（id）默认会自动叠加索引。

```ts
import { defineName } from '@overlays/core'

const name1 = defineName() // unified-overlay--1
const name2 = defineName('my-id') // my-id--1
const name3 = defineName('my-id2', false) // my-id2
```

## getIndex

用于获取当前名称的索引，用于 `@overlays/core` 内部传递 `index` 属性。

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