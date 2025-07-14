## Injection Holder

In addition to creating pop-up components using `defineOverlay` and `renderOverlay`, you can also use `useOverlay` to create pop-up components within a component and inherit the current context of the application.

```tsx
import { useOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

function Main() {
  // Create a component holder that supports the current context using useOverlay(Component)
  const [holder, openOverlay] = useOverlay(OverlayComponent, { type: 'holder' })

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
