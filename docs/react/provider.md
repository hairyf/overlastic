# Injection Provider ✨ (v0.5.0)

Obtaining the current node's context can be quite cumbersome when there is a Context/Provider present. While using `useOverlayHolder` requires placing the `holder` in the node, a global `Provider` can inherit the context from the node and render all pop-ups in bulk.

Therefore, we provide the following components and hooks support:

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

Use any Overlay Component on the page with `useOverlay`:

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
