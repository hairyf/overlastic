# @overlastic/react

`@overlastic/react` is used to define overlay components in React, supporting both imperative and declarative usage!

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

### Step 1: Define the Component

Use `useDisclosure` to define your overlay component:

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, confirm, cancel } = useDisclosure({
    // Duration of the overlay animation to prevent the component from being destroyed too early
    duration: 1000,
  })

  return (
    <div className={visible && 'is--visible'}>
      <span onClick={() => confirm(`${props.title}:confirmed`)}> Confirm </span>
    </div>
  )
}
```

### Step 2: Mount the Provider

Mount the `OverlaysProvider` at the root of your application:

```tsx
import { OverlaysProvider } from '@overlastic/react'

function Main() {
  return (
    <OverlaysProvider>
      <App />
    </OverlaysProvider>
  )
}
```

### Step 3: Invoke the Overlay

Use `useOverlay` in any component to trigger the overlay.

```tsx
import { useOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

function Page() {
  const openOverlay = useOverlay(OverlayComponent)

  async function handleClick() {
    const value = await openOverlay({ title: 'overlay' })
    // value === "overlay:confirmed"
  }

  return <button onClick={handleClick}>Open</button>
}
```

---

## Usage in JSX

Components created with `@overlastic/react` can be used within JSX in addition to being called via imperative methods. This is optional and highly useful when migrating legacy components.

```tsx
// If using TypeScript, use PropsWithOverlays to define props types
import type { PropsWithOverlays } from '@overlastic/react'
import { useDisclosure } from '@overlastic/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, confirm, cancel } = useDisclosure({
    // Pass props to the hook for handling
    props
  })

  return (
    <div className={visible && 'is--visible'}>
      ...
    </div>
  )
}
```

Once the component receives props, it can be used directly in JSX:

```tsx
import { useState } from 'react'
import { Component } from './overlay'

export function Main() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>open</button>
      <Component
        visible={visible}
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </>
  )
}
```

If you wish to replace the default fields and event names, you can modify the `events` and `model` configurations:

```tsx
export interface ComponentProps {
  onOk?: (value?: any) => void
  onNo?: (value?: any) => void
  open: boolean
}

export function Component(props: ComponentProps) {
  const { visible, confirm, cancel } = useDisclosure({
    events: { confirm: 'onOk', cancel: 'onNo' },
    model: 'open',
    props,
  })
  // ...
}
```

---

## Type Safety

You can use `PropsWithOverlays` to define the `props` and the `result` type of the overlay.

```tsx
function Component(props: PropsWithOverlays<{ title: string }, string>) {
  const { visible, confirm, cancel } = useDisclosure()
  // ...
}
```
