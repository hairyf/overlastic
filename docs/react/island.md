# Standalone and External Usage

Use the `defineOverlay` method to convert a component into a modal dialog, which allows you to invoke it directly within JavaScript/TypeScript.

```ts
import { defineOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

// Convert to a callback method
const callback = defineOverlay(OverlayComponent)
// Invoke the component and retrieve the value from the confirm callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also render the component directly via `renderOverlay`, bypassing the `defineOverlay` step.

```ts
import { renderOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

const value = await renderOverlay(OverlayComponent, {
  title: 'any'
})
// value === "any:confirmed"
```

## Singleton Render

Starting from version 0.6.0, the defineOverlay function supports the "only" property, which enables rendering only one pop-up layer.

Please note that renderOverlay function does not support the "only" property and cannot maintain independent instances.

Here is an example using the defineOverlay function with the "only" property:

```ts
const myModal = defineOverlay(Inst, { only: true })

// Only one instance will be displayed and returned
myModal()
myModal()
myModal()
myModal()
```
