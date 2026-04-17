# @overlastic/react

@overlastic/react 用于在 React 中定义 Overlays 组件，并支持命令式与声明式的使用！

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

### 步骤.1: 定义组件

使用 `useDisclosure` 定义弹出层组件：

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, confirm, cancel } = useDisclosure({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
    duration: 1000,
  })

  return (
    <div className={visible && 'is--visible'}>
      <span onClick={() => confirm(`${props.title}:confirmed`)}> Confirm </span>
    </div>
  )
}
```

### 步骤.2: 挂载 Provider

在应用根节点挂载 `OverlaysProvider`：

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

### 步骤.3: 调用弹出层

在任意组件中使用 `useOverlay` 调用组件。

```tsx
import { useOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

function Page() {
  const openOverlay = useOverlay(OverlayComponent)
  async function handleClick() {
    const value = await openOverlay({ title: 'overlay' })
    // value === "overlay:onfirmed"
  }
  return <button onClick={handleClick}>Open</button>
}
```

## 在 JSX 中使用

使用 `@overlastic/react` 创建的组件，除了支持使用回调方法调用以外，依旧支持在 jsx 中使用，这是一个可选项，在迁移旧组件时非常有用。

```tsx
// 如果使用 Typescript 需要使用 PropsWithOverlays 定义 props 类型
import type { PropsWithOverlays } from '@overlastic/react'
import { useDisclosure } from '@overlastic/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, confirm, cancel } = useDisclosure({
    // 将 props 传递给 hooks 处理
    props
  })

  return (
    <div className={visible && 'is--visible'}>
      ...
    </div>
  )
}
```

组件接收 props 后，即可在 JSX 中使用弹出层组件。

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

如果您想替换为其他的字段与事件名，可以更改 `events` 与 `model` 配置。

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

## 类型安全

你可以通过 `PropsWithOverlays` 定义弹窗的 `props` 与 `result`。

```tsx
function Component(props: PropsWithOverlays<{ title: string }, string>) {
  const { visible, confirm, cancel } = useDisclosure()
  // ...
}
```
