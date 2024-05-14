# @overlastic/react

@overlastic/react is used to define Overlay components in react and supports both imperative and declarative usage!

## Install

With pnpm: 
```sh
pnpm add @overlastic/react
```

With yarn:
```sh
yarn add @overlastic/react
```

## Usage

### Step 1: Define Component

```tsx
// overlay.tsx
export function Component(props) {
  const { visible, resolve, reject } = useOverlay({
    // Duration of overlay duration, helps prevent premature component destruction
    duration: 200,
  })

  return <div className={visible && 'is--visible'}>
    <span onClick={() => resolve(`${props.title}:confirmed`)}> Confirm </span>
  </div>
}
```

### Step 2: Create Overlay

You can convert the component into a modal dialog box by using the `defineOverlay` method, which allows you to call it in Javascript / Typescript.
```ts
import { defineOverlay } from '@overlastic/react'
import { Component } from './overlay'

// Convert to imperative callback
const callback = defineOverlay(Component)
// Call the component and get the resolve callback value
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also directly call the component through `renderOverlay`, bypassing the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlastic/react'
import { Component } from './overlay'

const value = await renderOverlay(Component, {
  title: 'useOverlay'
})
// value === "useOverlay:confirmed"
```

## Injection Holder

In addition to using `defineOverlay` and `renderOverlay` to create popup components, you can also use useInjectHolder to create popup components within a component and inherit the current context of the application.

```tsx
import { useInjectHolder } from '@overlastic/react'
import { OverlayComponent } from './overlay'

export function Main() {
  // Use useInjectHolder(Component) to create a component holder that supports the current context.
  const [holder, overlayApi] = useInjectHolder(OverlayComponent)

  function open() {
    // Open the popup component
    overlayApi()
      .then((result) => {})
  }
  return (<>
    <div onClick={open}> open </div>
    {/* Mount the holder */}
    {holder}
  </>)
}
```

## Define Component

Components created using `@overlastic/react` support both imperative and declarative methods of calling. In addition to imperative methods, these components can also be used in JSX.

> This is an optional option that is very useful when porting old components.

```tsx
// If using Typescript, use PropsWithOverlays to define props type
import type { PropsWithOverlays } from '@overlastic/react'
import { useOverlay } from '@overlastic/react'

export function Component(props: PropsWithOverlays<{ /* ...you props */ }>) {
  const { visible, resolve, reject } = useOverlay({
    // pass props to useOverlay for processing
    props
  })

  return <div className={visible && 'is--visible'}>
    ...
  </div>
}
```

Once the Overlay component has received props, the popup layer component can be used in JSX.

```tsx
import { useState } from 'react'
import { Component } from './overlay'

export function Main() {
  const [visible, setVisible] = useState(false)

  function openOverlay() {
    setVisible(true)
  }

  function onResolve(value) {
    setVisible(false)
  }

  function onReject(value) {
    setVisible(false)
  }

  return (
    <Component visible={visible} onResolve={onResolve} onReject={onReject} />
  )
}
```

If you want to replace other fields and event names, you can do so using the `model` and `events` config of useOverlay.

```jsx
function Component(props: { onOn?: Function; onNook?: Function; open: boolean }) {
  const { visible, resolve, reject } = useOverlay({
    events: { resolve: 'onOk', reject: 'onNook' },
    model: 'open',
    props,
  })
  // ...
}
```

## Customized

You can use `@overlastic/react` to modify existing components or component libraries

Take [antd(drawer)](https://ant.design/components/drawer-cn) as an example：

```tsx
import type { PropsWithOverlays } from '@overlastic/react'
import { useOverlay } from '@overlastic/react'
import { Button, Drawer } from 'antd'

function MyDrawer(props: PropsWithOverlays<{ title: string }>) {
  const { visible, resolve, reject } = useOverlay({
    duration: 200,
    props,
  })

  return (
    <Drawer title={props.title} onClose={reject} open={visible}>
      {/* Custom contents.... */}
      <Button type="primary" onClick={() => resolve(`${props.title}:confirmed`)}>
        Confirm
      </Button>
    </Drawer>
  )
}
```
