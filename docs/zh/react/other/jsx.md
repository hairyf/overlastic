# Template Support

使用 `@overlays/react` 创建的组件，除了支持使用命令式（Imperative）方法调用外，还支持在 JSX 中使用。

> 支持了 JSX 中使用的组件，同样也支持使用 callback 调用，并不会影响彼此功能，这是一项可选项。

### 步骤.1: Define Component

支持在 JSX 中使用，需要将 props 传入配置当中，props 中需要定义 `visible` 与 `onResolve|onReject`。

```tsx
// 如果使用 Typescript 需要使用 PropsWithOverlays 定义 props 类型
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

如果您想替换为其他的字段与事件名，可以通过 `useOverlayMeta` 的 `event|modal` 配置实现。

```tsx
// 如果使用 Typescript 需要使用 PropsWithOverlays 定义 props 类型
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

### 步骤.2: In Template

Overlay 组件接收 props 后，即可在 JSX 中使用弹出层组件。

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