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

使用 `useExtendOverlay` 定义弹出层组件，返回以下内容：

- `resolve|reject` 返回 Promise 的结果，将在 `duration` 结束时销毁组件
- `visible` 用于显示组件，执行 `Promise` 结果将马上被更改

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, resolve, reject } = useExtendOverlay({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
    duration: 1000,
  })

  return (
    <div className={visible && 'is--visible'}>
      <span onClick={() => resolve(`${props.title}:confirmed`)}> Confirm </span>
    </div>
  )
}
```

### 步骤.2: 创建弹出层

使用 `defineOverlay` 方法将组件转换为模态对话框，该方法允许在你 Javascript/Typescript 中调用它。

```ts
import { defineOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

// 转换为回调方法
const callback = defineOverlay(OverlayComponent)
// 调用组件并获取 resolve 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接渲染组件，跳过 `defineOverlay` 方法。

```ts
import { renderOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

const value = await renderOverlay(OverlayComponent, {
  title: 'useExtendOverlay'
})
// value === "useExtendOverlay:confirmed"
```

## 在 JSX 中使用

使用 `@overlastic/react` 创建的组件，除了支持使用回调方法调用以外，依旧支持在 jsx 中使用，这是一个可选项，在迁移旧组件时非常有用。

```tsx
// 如果使用 Typescript 需要使用 PropsWithOverlays 定义 props 类型
import type { PropsWithOverlays } from '@overlastic/react'
import { useExtendOverlay } from '@overlastic/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, resolve, reject } = useExtendOverlay({
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
    <Component
      visible={visible}
      onResolve={onResolve}
      onReject={onReject}
    />
  )
}
```

如果您想替换为其他的字段与事件名，可以更改 `events` 与 `model` 配置。

```jsx
interface ComponentProps {
  onOn?: (value?: any) => void
  onNook?: (value?: any) => void
  open: boolean
}
function Component(props: ComponentProps) {
  const { visible, resolve, reject } = useExtendOverlay({
    events: { resolve: 'onOk', reject: 'onNook' },
    model: 'open',
    props,
  })
  // ...
}
```
