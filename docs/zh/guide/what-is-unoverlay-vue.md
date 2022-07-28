# 什么是 Unoverlay Vue?

Unoverlay Vue 是用于在 Vue3 | Vue2 Composition-api 制造模态框的基本工具，它可以做很多事情，包括并不限于：

- 制作类似于 `element-plus/naiveui/vuetifyjs/vant`... 的 [Message](https://element.eleme.cn/#/en-US/component/message) 或 [Dialog](https://element.eleme.cn/#/en-US/component/dialog)
- 同时支持两种调用方式（ tempalte 或 js/ts）
- 使用现有组件库（如 element-plus）集成和定制化功能
- 支持组件继承全局应用上下文

## 技术背景

在大量繁琐的业务场景中，我经常被重复的 Model 类定义工作所困扰，这意味着一旦我遇到了 Model 类组件，我需要不断重复定义 `cancel`、`confirm`、`visible` 等通用字段，
在当需要保存组件状态时，我经常的需要对 Model 流程进行控制（`open model` -> `edit data` -> `@confirm` -> `save data`）
这极大的加剧了工作量，并在组件重复使用时产生大量的冗余代码。

从 Vue3 的 Composition-api 起，以及市面上的 Model 组件我得到了很大的启发，Unoverlay Vue 使得能使定义 Model 组件变得非常的轻松和强大，
它不仅仅支持在 Typescript、Javascript 中调用，当您想要 template 的模板优势时，使用 Unoverlay Vue 制作的 Model 依旧能胜任工作。
