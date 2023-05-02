<p align="center">
<img src="docs/public/circle.svg" style="width:100px;" />
</p>

<h1 align="center">Unified Overlays</h1>

<p align="center">
A create model/dialog/popup library
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/@overlays/core">
    <img src="https://img.shields.io/npm/v/@overlays/core.svg">
  </a>
</p>

> [English](./README.md) | 中文 or see [overlays-docs](https://overlays.vercel.app/zh/)

Unified Overlays 是构建弹出层的插件，创建回调（命令式）方法、以及在 Vue Template 或 React Jsx 中（声明式）使用。

###### Features

- 简化创建消息或对话框，并支持回调（命令式）和 Template/JSX（声明式）方法。
- 同时支持回调（命令式）与Template/JSX（声明式）
- 集成和自定义现有组件库，例如 `element-plus` 和 `antd`。
- 支持全局应用程序上下文的组件继承。
- 支持流行前端渐进式框架（Vue2 & 3，React）。

## packages

- @overlays/vue - 在 Vue 应用中使用 Unified Overlays 创建弹出层
- @overlays/react - 在 React 应用中使用 Unified Overlays 创建弹出层

## Devtools

由 Unified Overlays 创建的组件，均支持对应框架的 Devtools（React、Vue）

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` 在对应的组件中插入持有者，使其在虚拟 DOM 当中。
- `child-app` 创建独立的应用，由 devtools 识别新应用。

## Why?

创建模态类组件重复且耗时。当重用使用这类的组件时，需要重复定义 reject、resolve 和 visible 等公共字段。此外，控制 Model 过程（`clear data`->`open Model`->`edit data`->`onConfirm`->`save data`）会导致大量冗余代码，尤其是对于图像选择器等常用组件。

Unified Overlays 通过统一冗余流程和状态管理简化了模式创建。它可以有效地创建命令式组件，并且仍然可以声明式使用。

## Install

```
pnpm add @overlays/vue
# Or React
pnpm add @overlays/react
```

## Usage

使用 `overlays` 提供的 `useOverlay` Hook 创建弹出层组件（Vue、React）

```ts
// 在你的 Vue、React 弹出层组件中，使用 useOverlay 获取弹出层元信息
const { visible, resolve, reject } = useOverlay({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
  duration: 1000
})
```

使用 `defineOverlay|renderOverlay` 转换为命令式回调（callback）

```ts
const callback = defineOverlay(OverlayComponent)
const result = await callback(props)
```

---

```ts
const result = renderOverlay(OverlayComponent, {
  props
})
```

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
