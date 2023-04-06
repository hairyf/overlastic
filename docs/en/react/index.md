# Getting Started

## Install

With pnpm: 
```sh
pnpm add @unoverlays/react
```

With yarn:
```sh
yarn add @unoverlays/react
```

## Usage

### Step 1: Define Component

Unoverlays is suitable for most components, and using useOverlayMeta allows for finer control over the component process.

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, resolve, reject } = useOverlayMeta({
    // Duration of overlay animation, helps prevent premature component destruction
    animation: 1000,
  })

  return <div className={visible && 'is--visible'}>
    <span onClick={() => resolve(`${props.title}:confirmed`)}> Confirm </span>
  </div>
}
```

### Step 2: Create Overlay

You can convert the component into a modal dialog box by using the `defineOverlay` method, which allows you to call it in Javascript / Typescript.
```ts
import { defineOverlay } from '@unoverlays/react'
import { OverlayComponent } from './overlay'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the resolve callback value
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also directly call the component through `renderOverlay`, bypassing the `defineOverlay` method.

```ts
import { renderOverlay } from '@unoverlays/react'
import { OverlayComponent } from './overlay'

const value = await renderOverlay(OverlayComponent, {
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```
