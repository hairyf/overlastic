# Template Support

Components created using `@unoverlays/react` support both imperative and declarative methods of calling. In addition to imperative methods, these components can also be used in JSX.

> Components that support use in JSX also support callback invocation without affecting each other's functionality. This is an optional feature.

### Step 1: Define Component

To support use in JSX, props need to be passed into the configuration, and visible and `onConfirm`|`onCancel` need to be defined in props.

```tsx
// If using Typescript, use PropsWithOverlays to define props type
import type { PropsWithOverlays } from '@unoverlays/react'
import { useOverlayMeta } from '@unoverlays/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, confirm, cancel } = useOverlayMeta({
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
import type { PropsWithOverlays } from '@unoverlays/react'
import { useOverlayMeta } from '@unoverlays/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, confirm, cancel } = useOverlayMeta({
    event: { confirm: 'onOk', cancel: 'onNook' },
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

  function onConfirm(value) {
    setVisible(false)
  }

  function onCancel(value) {
    setVisible(false)
  }

  return (
    <OverlayComponent visible={visible} onConfirm={onConfirm} onCancel={onCancel} />
  )
}
```