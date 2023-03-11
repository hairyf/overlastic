# Injection Holder

除了使用 `createOverlay` 与 `renderOverlay` 创建使用弹出层组件外，还支持使用 `useInjectHolder` 创建在组件内部的弹出层组件，并继承应用的当前上下文。

```tsx
import { useInjectHolder } from '@unoverlays/react'
import { OverlayComponent } from './overlay'

export function Main() {
  // 通过 useInjectHolder(Component) 创建支持当前 context 的组件持有者
  const [overlayApi, holder] = useInjectHolder(OverlayComponent)

  function open() {
  // 打开弹出层
    overlayApi()
      .then((result) => {})
  }
  return (<>
    <div onClick={open}> open </div>
    {/* 挂载 holder */}
    {holder}
  </>)
}
```
