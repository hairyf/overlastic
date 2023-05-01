# Getting Started

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

overlays 适用于绝大多数组件，使用 `useOverlayMeta` 能对组件流程有更细致的控制。

```tsx
// overlay.tsx
export function OverlayComponent(props) {
  const { visible, resolve, reject } = useOverlayMeta({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
    animation: 1000,
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
  props: { title: 'useOverlay' }
})
// value === "useOverlay:confirmed"
```
