# Unified Overlays

Unified Overlays 是构建弹出层的插件，创建回调（命令式）方法、以及在 Vue Template 或 React Jsx 中（声明式）使用。

###### Features

- 💫 简化创建消息或对话框，并将你的 UI 定义为 promise
- 🧩 集成定制与自定义现有组件库
- 🦾 为每个 constructor 提供安全的类型提示
- 🌟 稳定！ **99.54%** 单元测试覆盖率
- ➿ 支持全局应用程序上下文的组件继承

## packages

- [@overlays/svelte](/zh/core/svelte/)
- [@overlays/vue](/zh/vue/)
- [@overlays/react](/zh/react/)
- [@overlays/element](/zh/core/element/)
- [@overlays/core](/zh/core/functions/constructor.html) - 快速适应与创建应用程序

## Devtools

Unified Overlays 支持不同框架的 Devtools（React、Vue）

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` 在对应的组件中插入持有者，使其在虚拟 DOM 当中。
- `child-app` 创建独立的应用，由 devtools 识别新应用。

## Why?

创建模态类组件重复且耗时。当重用使用这类的组件时，需要重复定义 reject、resolve 和 visible 等公共字段。此外，控制 Model 过程（`clear data`->`open Model`->`edit data`->`onConfirm`->`save data`）会导致大量冗余代码，尤其是对于图像选择器等常用组件。

Unified Overlays 通过统一冗余流程和状态管理简化了模式创建。它可以有效地创建命令式组件，并且仍然可以声明式使用。
