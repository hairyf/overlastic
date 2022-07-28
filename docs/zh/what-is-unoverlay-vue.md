# What is UnoverlayVue?

Unoverlay Vue 是用于在Vue3 | Vue2 Composition-api 制造模态框的基本工具，它可以做很多事情，包括并不限于：

- 制作类似于 `element-plus/naiveui/vuetifyjs/vant`... 的 [Message](https://element.eleme.cn/#/en-US/component/message) 或 [Dialog](https://element.eleme.cn/#/en-US/component/dialog)
- 同时支持两种调用方式（ tempalte 或 js/ts）
- 使用现有组件库（如 element-plus）集成和定制化功能
- 支持组件继承全局应用上下文

## Motivation

在大量繁琐的业务场景中，我经常被重复的 Model 类定义工作所困扰，这意味着一旦我遇到了 Model 类组件，我需要不断重复定义 `cancel`、`confirm`、`visible` 等通用字段，

在当需要保存组件状态时，我经常的需要对 Model 流程进行控制（`open model` -> `edit data` -> `@confirm` -> `save data`）这极大的加剧了工作量，产生大量的冗余代码。
