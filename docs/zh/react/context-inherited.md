# Component devtools

React 使用 `defineOverlay|renderOverlay` 渲染的组件无法正常继承上下文，但您可以使用 [useInjectHolder](/zh/react/holder) 在组件内部创建弹出层，并继承应用的当前上下文。
