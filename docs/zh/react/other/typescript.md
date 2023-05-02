# ⌨️ Typescript

如果您希望组件在回调中调用时具有正确的类型声明，你需要定义 `params|resolved`，一个简单的案例：



- 步骤.1: 组件使用参数类型

```tsx
import type { PropsWithOverlays } from '@overlays/react'
import { useOverlay } from '@overlays/react'

export interface Params {
  title?: string
}
export type Resolved = string

export function OverlayComponent(props: PropsWithOverlays<Params>) {
  // props.title // ?string
  const { visible, resolve, reject } = useOverlay<Resolved>({
    props,
    duration: 1000
  })
}
```

- 步骤.2: 在使用 `defineOverlay` 或 `renderOverlay` 时传入类型

```ts
import { defineOverlay } from '@overlays/vue'
import { OverlayComponent, Params, Resolved } from './overlay'
import type { Params, Resolved } from './define'

const callback = defineOverlay<Params, Resolved>(OverlayComponent)
```
