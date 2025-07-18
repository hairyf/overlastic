# @overlastic/react

@overlastic/react is used to define Overlay components in React, supporting both imperative and declarative usage!

::: code-group

```bash [npm]
npm install @overlastic/react
```

```bash [yarn]
yarn add @overlastic/react
```

```bash [pnpm]
pnpm add @overlastic/react
```

:::

## Usage

### Step 1: Define Component

Use `useDisclosure` to define a pop-up component, which returns the following:

- `confirm|cancel` returns the result of a Promise, and the component will be destroyed at the end of `duration`
- `visible` is used to display the component, and the result of the `Promise` will be changed immediately

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, confirm, cancel } = useDisclosure({
    // Duration of the overlay animation to prevent premature destruction of the component
    duration: 1000,
  })

  return (
    <div className={visible && 'is--visible'}>
      <span onClick={() => confirm(`${props.title}:confirmed`)}> Confirm </span>
    </div>
  )
}
```

### Step 2: Create Overlay

Use the `defineOverlay` method to convert the component into a modal dialog, allowing you to call it in your JavaScript/TypeScript.

```ts
import { defineOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

// Convert to a callback method
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the confirm callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also directly render the component using `renderOverlay`, bypassing the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

const value = await renderOverlay(OverlayComponent, {
  title: 'useDisclosure'
})
// value === "useDisclosure:confirmed"
```

## Usage in JSX

Components created with `@overlastic/react`, besides supporting callback method invocation, can still be used in JSX, which is optional and useful when migrating old components.

```tsx
// If using TypeScript, use PropsWithOverlays to define the props type
import type { PropsWithOverlays } from '@overlastic/react'
import { useDisclosure } from '@overlastic/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, confirm, cancel } = useDisclosure({
    // Pass props to the hooks for processing
    props
  })

  return (
    <div className={visible && 'is--visible'}>
      ...
    </div>
  )
}
```

Once the component receives props, you can use the pop-up component in JSX.

```tsx
import { useState } from 'react'
import { Component } from './overlay'

export function Main() {
  const [visible, setVisible] = useState(false)

  function openOverlay() {
    setVisible(true)
  }

  function onConfirm(value) {
    setVisible(false)
  }

  function onCancel(value) {
    setVisible(false)
  }

  return (
    <Component
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}
```

If you want to replace other field and event names, you can change the `events` and `model` configurations.

```tsx
export interface ComponentProps {
  onOn?: (value?: any) => void
  onNook?: (value?: any) => void
  open: boolean
}
export function Component(props: ComponentProps) {
  const { visible, confirm, cancel } = useDisclosure({
    events: { confirm: 'onOk', cancel: 'onNook' },
    model: 'open',
    props,
  })
  // ...
}
```
