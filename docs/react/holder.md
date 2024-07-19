## Injection Holder

In addition to creating pop-up components using `defineOverlay` and `renderOverlay`, you can also use `useOverlayHolder` to create pop-up components within a component and inherit the current context of the application.

```tsx
import { useOverlayHolder } from '@overlastic/react'
import { OverlayComponent } from './overlay'

function Main() {
  // Create a component holder that supports the current context using useOverlayHolder(Component)
  const [holder, openOverlay] = useOverlayHolder(OverlayComponent)

  function open() {
    // Open the overlay
    openOverlay()
      .then((result) => {})
  }

  return (
    <>
      {/* Mount the holder */}
      {holder}
      <div onClick={open}> open </div>
    </>
  )
}

export default Main
```
