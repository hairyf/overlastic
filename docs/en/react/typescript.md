# ⌨️ Typescript

If you want your component to have correct type declarations when called in a callback, you need to define params|resolved. Here's a simple example:

- Step 1: Component using parameter types

```tsx
import type { PropsWithOverlays } from '@unoverlays/react'
import { useOverlayMeta } from '@unoverlays/react'

export interface Params {
  title?: string
}
export type Resolved = string

export function OverlayComponent(props: PropsWithOverlays<Params>) {
  // props.title // ?string
  const { visible, resolve, reject } = useOverlayMeta<Resolved>({
    props,
    animation: 1000
  })
}
```

- Step 2: Pass in the types when using defineOverlay or renderOverlay

```ts
import { defineOverlay } from '@unoverlays/vue'
import { OverlayComponent, Params, Resolved } from './overlay'
import type { Params, Resolved } from './define'

const callback = defineOverlay<Params, Resolved>(OverlayComponent)
```
