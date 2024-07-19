<p align="center">
<img src="docs/public/circle.svg" style="width:100px;" />
</p>

<h1 align="center">Unified Overlays</h1>

<p align="center">
A create modal | dialog | popup library
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/@overlastic/core">
    <img src="https://img.shields.io/npm/v/@overlastic/core.svg">
  </a>
</p>

<p align="center">
  <a href="https://github.com/hairyf/overlastic">English</a> | Chinese | <a href="https://overlastic.vercel.app/zh/">docs</a>
</p>

    Unified Overlays 用于创建组件的回调（命令式）方法、并同时支持 Vue、React 等组件的声明式使用。

###### Features

- 💫 简化创建消息或对话框，并将你的 UI 定义为 promise
- 🧩 集成定制与自定义现有组件库
- 🦾 为每个 constructor 提供安全的类型提示
- 🌟 稳定！ **99.54%** 单元测试覆盖率
- ➿ 支持全局应用程序上下文的组件继承

## packages

- [@overlastic/vanilla](https://overlastic.vercel.app/zh/core/element/)
- [@overlastic/react](https://overlastic.vercel.app/zh/core/react/)
- [@overlastic/vue](https://overlastic.vercel.app/zh/vue/)
- [@overlastic/svelte](https://overlastic.vercel.app/zh/core/svelte/)
- [@overlastic/core](https://overlastic.vercel.app/zh/core/functions/constructor.html)

## Devtools

由 Unified overlays 创建的组件，支持对应框架的 Devtools（React、Vue）

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
pnpm add @overlastic/vue
# Or React
pnpm add @overlastic/react
```

## Usage

使用 `overlays` 提供的 `useOverlayDefine` Hook 创建弹出层组件（Vue、React）

```ts
// 在你的 Vue、React 弹出层组件中，使用 useOverlayDefine 获取弹出层元信息
const { visible, resolve, reject } = useOverlayDefine({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
  duration: 1000
})
```

使用 `defineOverlay|renderOverlay` 转换为命令式回调（callback）

```ts
const callback = defineOverlay(Component)
const result = await callback(props)
```

---

```ts
const result = renderOverlay(Component, props)
```

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
