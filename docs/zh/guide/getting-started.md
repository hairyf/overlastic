# Getting Started

> Unoverlays 支持 Vue3 | Vue2 | React 应用

你可以通过命令行工具进行安装 unoverlays

## Install

```sh
pnpm add @unoverlays/vue
# or react
pnpm add @unoverlays/react
```

## Usage

使用 `unoverlays` 提供的 `useOverlayMeta` Hook 创建弹出层组件（Vue、React）

```ts
// 在你的 Vue、React 弹出层组件中，使用 useOverlayMeta 获取弹出层元信息
const { visible, confirm, cancel } = useOverlayMeta({
  // 弹出层动画的持续时间, 可以避免组件过早被销毁
  animation: 1000
})

// 成功并关闭弹出层
confirm('ok')
// 失败并关闭弹出层
cancel('nook')
// 用于控制显示隐藏
visible
```

使用 `createOverlay|renderOverlay` 转换为命令式回调（callback）

```ts
const callback = createOverlay(OverlayComponent)
const result = await callback(props)
```

---

```ts
const result = renderOverlay(OverlayComponent, {
  props: { msg: 'ok' }
})
```

如果你想看更详细的使用，浏览所使用框架的对应文档：

- [@unoverlays/vue](/)
- [@unoverlays/react](/)