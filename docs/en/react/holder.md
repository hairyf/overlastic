# Injection Holder

In addition to using defineOverlay and renderOverlay to create popup components, you can also use useInjectHolder to create popup components within a component and inherit the current context of the application.

```tsx
import { useInjectHolder } from '@unoverlays/react'
import { OverlayComponent } from './overlay'

export function Main() {
  // Use useInjectHolder(Component) to create a component holder that supports the current context.
  const [overlayApi, holder] = useInjectHolder(OverlayComponent)

  function open() {
    // Open the popup component
    overlayApi()
      .then((result) => {})
  }
  return (<>
    <div onClick={open}> open </div>
    {/* Mount the holder */}
    {holder}
  </>)
}
```
