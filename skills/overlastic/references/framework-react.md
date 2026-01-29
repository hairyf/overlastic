---
name: react-integration
description: How to use Overlastic with React components
---

# React Integration

`@overlastic/react` provides React-specific implementations for creating overlay components with both imperative and declarative usage.

## Installation

```bash
pnpm add @overlastic/react
```

## Basic Workflow

### Step 1: Define Component

Use `useDisclosure` to manage overlay state:

```tsx
import { useDisclosure } from '@overlastic/react'

export function OverlayComponent(props: { title: string }) {
  const { visible, confirm, cancel } = useDisclosure({
    duration: 1000
  })

  return (
    <div className={visible ? 'is-visible' : ''}>
      <span onClick={() => confirm(`${props.title}:confirmed`)}>
        Confirm
      </span>
      <span onClick={() => cancel()}>Cancel</span>
    </div>
  )
}
```

### Step 2: Mount Provider

Mount `OverlaysProvider` at the root for context inheritance:

```tsx
import { OverlaysProvider } from '@overlastic/react'

function App() {
  return (
    <OverlaysProvider>
      <YourApp />
    </OverlaysProvider>
  )
}
```

### Step 3: Call Overlay

Use `useOverlay` hook to call the component:

```tsx
import { useOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

function Page() {
  const openOverlay = useOverlay(OverlayComponent)

  async function handleClick() {
    const value = await openOverlay({ title: 'Hello' })
    console.log(value) // "Hello:confirmed"
  }

  return <button onClick={handleClick}>Open</button>
}
```

## Standalone Usage

Without `OverlaysProvider`, use `defineOverlay` or `renderOverlay`:

```typescript
import { defineOverlay, renderOverlay } from '@overlastic/react'
import { OverlayComponent } from './overlay'

// Option 1: Define then call
const callback = defineOverlay(OverlayComponent)
const value = await callback({ title: 'Hello' })

// Option 2: Direct render
const value = await renderOverlay(OverlayComponent, { title: 'Hello' })
```

## Declarative Usage

Components can be used in JSX with props:

```tsx
import type { PropsWithOverlays } from '@overlastic/react'
import { useDisclosure } from '@overlastic/react'

export function OverlayComponent(props: PropsWithOverlays) {
  const { visible, confirm, cancel } = useDisclosure({ props })
  // ...
}

// Usage in parent
function Parent() {
  const [visible, setVisible] = useState(false)

  return (
    <OverlayComponent
      visible={visible}
      onConfirm={(value) => setVisible(false)}
      onCancel={() => setVisible(false)}
    />
  )
}
```

## Custom Event Names

Customize event and model names:

```tsx
interface ComponentProps {
  onOk?: (value?: any) => void
  onNook?: (value?: any) => void
  open: boolean
}

export function Component(props: ComponentProps) {
  const { visible, confirm, cancel } = useDisclosure({
    events: { confirm: 'onOk', cancel: 'onNook' },
    model: 'open',
    props
  })
  // ...
}
```

## Key Points

* **Provider Required**: `useOverlay` requires `OverlaysProvider` for context inheritance.
* **Type Safety**: Use `PropsWithOverlays` type for declarative component props.
* **Devtools Support**: Components created with `OverlaysProvider` appear in React DevTools.
* **Standalone Mode**: `defineOverlay`/`renderOverlay` work without provider but lose context inheritance.
