---
name: constructor
description: How to create and use overlay constructors effectively
---

# Constructor

The `constructor` is the core method of `@overlastic/core`, representing a special overlay constructor that receives all information needed to mount a popup layer.

## Creating a Custom Constructor

Use `createConstructor` to create a custom constructor. It receives a `mount` function with parameters: `component`, `props`, and `options`.

```typescript
import { createConstructor } from '@overlastic/core'

interface CustomComponent {
  (props: any): Element
}

interface CustomOptions {
  className?: string
}

const constructor = createConstructor<CustomComponent, CustomOptions>(
  (component, props, options) => {
    const { container, id, index, deferred, className } = options

    function vanish() {
      container.remove()
    }

    const inst = component({
      ...props,
      deferred,
      vanish
    })

    if (className)
      inst.classList.add(className)

    container.append(inst)
  }
)
```

## Using Constructor

`createConstructor` returns `define` and `render` methods:

- `define`: Creates an imperative callback function
- `render`: Directly renders the component

```typescript
// Define imperative callback
const callback = constructor.define(Component, { className: 'custom-class' })
const result = await callback({ title: 'Hello', content: 'World' })

// Or render directly
const result = await constructor.render(Component, {
  title: 'Hello',
  content: 'World'
})
```

## Mount Options

The `options` parameter in the mount function includes:

- `container`: HTMLDivElement for mounting
- `id`: Unique identifier for the mounted element
- `index`: Current element level (defaults to 0)
- `deferred`: Promise-like object for controlling overlay lifecycle
- `position`: Mouse position during triggering (optional)

## Key Points

* **Container Management**: By default, containers are created and mounted to `document.body`. Set `container: false` in constructor options to disable automatic mounting.
* **Deferred Control**: Always pass `deferred` to your component so it can call `confirm()` or `cancel()` to resolve the promise.
* **Vanish Pattern**: Components should call `vanish()` when `deferred` resolves/rejects to clean up DOM elements.
* **Only Mode**: Use `only: true` in options to prevent multiple instances from being created simultaneously.
