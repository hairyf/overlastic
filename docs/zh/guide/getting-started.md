# Overlastic

Overlastic 提供了一套标准流程用于创建消息或对话框，并将你的 UI 定义为 Promise，支持在不同的框架中使用。

###### Features

- 💫 简化创建弹出层，并将你的 UI 定义为 promise
- 🧩 在已有的组件或组件库上进行集成
- 🦾 由 TS 支持，提供安全的类型提示
- ➿ 支持上下文的组件继承

## packages

- [@overlastic/svelte](/zh/svelte/)
- [@overlastic/react](/zh/react/)
- [@overlastic/vue](/zh/vue/)
- [@overlastic/vanilla](/zh/element/)
- [@overlastic/core](/zh/functions/constructor.html)

## Devtools

Unified Overlays 支持不同框架的 Devtools（React、Vue）

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

## Why?

创建弹窗组件是一个重复且耗时的任务。而每次重用这类组件时，都需要重复定义 reject、resolve 和 visible 等公共字段。此外，控制这个过程（`clear data`->`open Model`->`edit data`->`onConfirm`->`save data`）也会导致大量冗余代码，尤其是对于一些全局组件。

Overlastic 简化了弹出层的创建，通过减少冗余流程和管理相应状态。它能够有效地创建命令式组件，同时支持声明式使用。
