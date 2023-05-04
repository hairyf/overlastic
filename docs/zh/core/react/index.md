# @overlays/react

@overlays/react 用于在 React 中定义 Overlays 组件，并支持命令式与声明式的使用！

## Install

With pnpm: 
```sh
pnpm add @overlays/react
```

With yarn:
```sh
yarn add @overlays/react
```

## Usage

### 步骤.1: Define Component

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, resolve, reject } = useOverlay({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
    duration: 1000,
  })

  return <div className={visible && 'is--visible'}>
    <span onClick={() => resolve(`${props.title}:confirmed`)}> Confirm </span>
  </div>
}
```

### 步骤.2: Create Overlay

你可以通过 `defineOverlay` 的方法将组件转换成模态框的方法，它允许你在 `Javascript` / `Typescript` 中调用。

```ts
import { defineOverlay } from '@overlays/react'
import { OverlayComponent } from './overlay'

// 转换为命令式回调
const callback = defineOverlay(OverlayComponent)
// 调用组件并获取 resolve 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接调起组件，跳过 `defineOverlay` 方法。

```ts
import { renderOverlay } from '@overlays/react'
import { OverlayComponent } from './overlay'

const value = await renderOverlay(OverlayComponent, {
  title: 'useOverlay'
})
// value === "useOverlay:confirmed"
```

## Injection Holder

除了使用 `defineOverlay` 与 `renderOverlay` 创建使用弹出层组件外，还支持使用 `useInjectHolder` 创建在组件内部的弹出层组件，并继承应用的当前上下文。

```tsx
import { useInjectHolder } from '@overlays/react'
import { OverlayComponent } from './overlay'

export function Main() {
  // 通过 useInjectHolder(Component) 创建支持当前 context 的组件持有者
  const [holder, overlayApi] = useInjectHolder(OverlayComponent)

  function open() {
  // 打开弹出层
    overlayApi()
      .then((result) => {})
  }
  return (<>
    <div onClick={open}> open </div>
    {/* 挂载 holder */}
    {holder}
  </>)
}
```

## Define Component

使用 `@overlays/react` 创建的组件，除了支持使用命令式（Imperative）方法调用外，还支持在 JSX 中使用。

> 这是一个可选项，在迁移旧组件时非常有用。

```tsx
// 如果使用 Typescript 需要使用 PropsWithOverlays 定义 props 类型
import type { PropsWithOverlays } from '@overlays/react'
import { useOverlay } from '@overlays/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, resolve, reject } = useOverlay({
    // 将 props 传递给 hooks 处理
    props
  })

  return <div className={visible && 'is--visible'}>
    ...
  </div>
}
```

组件接收 props 后，即可在 JSX 中使用弹出层组件。

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

如果您想替换为其他的字段与事件名，可以更改 `events` 与 `model` 配置。

```jsx
function Component(props: { onOn?: Function, onNook?: Function, open: boolean }) {
  const { visible, resolve, reject } = useOverlay({
    events: { resolve: 'onOk', reject: 'onNook' },
    model: 'open',
    props,
  })
  // ...
}
```

## Customized

您可以使用 `@overlays/react` 修改现有组件或组件库，拿 [antd(drawer)](https://ant.design/components/drawer-cn) 举例：

```tsx
import type { PropsWithOverlays } from '@overlays/react'
import { useOverlay } from '@overlays/react'
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
