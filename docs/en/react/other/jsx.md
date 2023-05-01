# Template Support

Components created using `@overlays/react` support both imperative and declarative methods of calling. In addition to imperative methods, these components can also be used in JSX.

> Components that support use in JSX also support callback invocation without affecting each other's functionality. This is an optional feature.

### Step 1: Define Component

To support use in JSX, props need to be passed into the configuration, and visible and `onResolve`|`onReject` need to be defined in props.

```tsx
// If using Typescript, use PropsWithOverlays to define props type
import type { PropsWithOverlays } from '@overlays/react'
import { useOverlayMeta } from '@overlays/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, resolve, reject } = useOverlayMeta({
    props
  })

  return <div className={visible && 'is--visible'}>
    ...
  </div>
}
```

If you want to replace other `fields` and event names, you can do so using the field configuration of useOverlayMeta.

```tsx
// If using Typescript, use PropsWithOverlays to define props type
import type { PropsWithOverlays } from '@overlays/react'
import { useOverlayMeta } from '@overlays/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, resolve, reject } = useOverlayMeta({
    event: { resolve: 'onOk', reject: 'onNook' },
    modal: 'open',
    props,
  })

  return <div className={visible && 'is--visible'}>
    ...
  </div>
}
```

### Step 2: In Template

Once the Overlay component has received props, the popup layer component can be used in JSX.

```tsx
import { useState } from 'react'
import { OverlayComponent } from './overlay'
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
    <OverlayComponent visible={visible} onResolve={onResolve} onReject={onReject} />
  )
}
```