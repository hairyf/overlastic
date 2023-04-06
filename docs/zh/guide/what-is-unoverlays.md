# 什么是 Unoverlays?

Unoverlays 是构建弹出层的统一插件，创建回调（命令式）方法、以及在 Vue Template 或 React Jsx 中（声明式）使用。

- 制作类似于 `element-plus/antd`... 的 Message 或 Dialog
- 同时支持回调（命令式）与Template/JSX（声明式）
- 使用现有组件库（如 element-plus、antd）集成和定制化功能
- 支持组件继承全局应用上下文
- 支持 `vue2|3`、`react` 等前端渐进式框架。


## packages

- [@unoverlays/vue](/zh/vue/) - 在 Vue 应用中使用 Unified Overlays 创建弹出层
- [@unoverlays/react](/zh/react/) - 在 React 应用中使用 Unified Overlays 创建弹出层

## Devtools

由 Unified Overlays 创建的组件，均支持对应框架的 Devtools（React、Vue）

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` 在对应的组件中插入持有者，使其在虚拟 DOM 当中。
- `child-app` 创建独立的应用，由 devtools 识别新应用。

## Why?

在如今日益繁琐的业务场景中，我们经常被重复的 Model 类定义工作所困扰，这意味着一旦遇到了 Model 类组件，我们需要不断重复定义 `reject`、`resolve`、`visible` 等通用字段，
在当保存组件状态时，经常的需要对 Model 流程进行控制（`open model` -> `edit data` -> `@resolve` -> `save data`）
这极大的加剧了工作量，并在组件重复使用时产生大量的冗余代码。

这个时候，则需要对 Modal 进行命令化（回调的方式），Unified Overlays 将多余的流程与状态统一管理，而当我们需要声明式使用时（即在 Vue Template 或 React Jsx）中，使用 Unified Overlays 创建组件依旧有效。
