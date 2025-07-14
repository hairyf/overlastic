# Constructor

`constructor` is the core method of `@overlastic/core`, representing a special `overlays` constructor that receives all the information needed to mount a pop-up layer and implements the mounting of the `overlays` layer.

> You may not need to use Constructor. We provide different Overlays Constructor implementations for different frameworks. Please check the [packages](/zh/guide/getting-started#packages) to find the one for the framework you are using!

## Custom Constructor

Create a custom constructor through `createConstructor`, which receives a `mount` function, with internal parameters including `component`, `props`, and `options`, where `options` are the mounting configurations.

```ts
export interface CustomComponent {
  (props: any): Element
}

export interface CustomOptions {
  // Your custom configuration
  className?: string
}

const constructor = createConstructor<CustomComponent, CustomOptions>(
  (component, props, options) => {
    // Options contain the passed-in custom configuration
    const { container, id, index, deferred, className } = options

    function vanish() {
      container.remove()
    }

    const inst = component({
      ...props,
      // Pass the deferred to the component
      deferred,
      // Pass the destruction method to the component
      vanish
    })

    // Use custom configuration
    if (className)
      inst.classList.add(className)

    // Mount the element
    container.append(inst)
  }
)
```

## Use Constructor

`createConstructor` returns the `define` and `render` methods. `define` is used to define an imperative callback, while `render` directly renders.

```ts
function Component(props) {
  const element = document.createElement('div')
  element.classList.add('dialog-mask')
  element.innerHTML = `
    <div class="dialog-card">
      <div class="dialog-title">${props.title || 'Dialog'}</div>
      <div class="dialog-content">${props.content}</div>
      <div class="dialog-footer">
        <button class="confirm"> confirm </button>
        <button class="close"> close </button>
      </div>
    </div>
  `

  // Add events that cause the pop-up layer to end
  element.querySelector('button.confirm').onclick = function () {
    props.deferred.confirm('ok')
  }

  // Add events that cause the pop-up layer to pop up
  element.querySelector('button.close').onclick = function () {
    props.deferred.cancel('close')
  }

  // When the deferred is triggered by the outside or the component, the component should be destroyed.
  props.deferred.finally(() => props.vanish())

  return element
}

// Define the imperative callback
const callback = constructor.define(Component, { className: 'custom-class' })
```

Mount the custom component by using the imperative callback defined by `constructor.define` and obtain the return value.

```ts
const result = await callback({
  title: 'Goodbye',
  content: 'Opportunities may not always come, but when they do, seize them.'
})

// result: ok
```

Alternatively, directly render the component by using constructor.render.

```ts
const result = await constructor.render(Component, {
  title: 'Goodbye',
  content: 'Opportunities may not always come, but when they do, seize them.'
})
// result: ok
```
