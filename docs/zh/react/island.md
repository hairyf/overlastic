# 独立与应用外使用

使用 `defineOverlay` 方法将组件转换为模态对话框，该方法允许你直接在 Javascript/Typescript 中调用它。

```ts
import { defineOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

// 转换为回调方法
const callback = defineOverlay(OverlayComponent)
// 调用组件并获取 confirm 回调的值
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

你也可以通过 `renderOverlay` 直接渲染组件，跳过 `defineOverlay` 方法。

```ts
import { renderOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

const value = await renderOverlay(OverlayComponent, {
  title: 'any'
})
// value === "any:confirmed"
```

# Singleton Render

从版本 0.6.0 开始，defineOverlay 函数支持 `only` 属性，可以仅渲染一个弹出层。

请注意，renderOverlay函数不支持 `only` 属性，也无法维护独立的实例。

以下是使用defineOverlay函数和 `only` 属性的示例：

```ts
const myModal = defineOverlay(Inst, { only: true })

// 只会显示，并返回一个实例
myModal()
myModal()
myModal()
myModal()
```
