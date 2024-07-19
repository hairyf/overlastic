# Injection Provider ✨ (v0.5.0)

在存在 Context/Provider 的情况下，获取当前节点上下文变得相当麻烦。而使用 `useOverlayHolder` 需要将 `holder` 放置到节点中，全局的 `Provider` 可以继承节点中的上下文，并批量渲染所有弹窗。

所以我们提供了以下的组件与钩子支持：

```tsx
import { OverlayProvider } from '@overlastic/react'

function Main() {
  return (
    <OverlayProvider>
      <App />
    </OverlayProvider>
  )
}
export default Main
```

在页面中通过 `useOverlay` 使用任意 Overlay Component：

```tsx
import { useOverlay } from '@overlastic/react'
import CustomDialog from './Dialog.tsx'

function Page() {
  const openDialog = useOverlay(CustomDialog)
  async function onClick() {
    const resolved = await openDialog({ title: 'My Title' })
    console.log(resolved)
  }
  return (
    <button onClick={onClick}>
      Open Modal
    </button>
  )
}

export default Page
```
