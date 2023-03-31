# Only Render Overlay(>0.6.0)

从版本0.6.0开始，defineOverlay函数支持 `only` 属性，可以仅渲染一个弹出层。

请注意，renderOverlay函数不支持 `only` 属性，也无法维护独立的实例。

以下是使用defineOverlay函数和 `only` 属性的示例：

```ts
const myModal = defineOverlay(Comp, { only: true })

// 只会显示，并返回一个实例
myModal()
myModal()
myModal()
myModal()
```