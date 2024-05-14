# @overlastic/vanilla

create imperative overlays in the native application, support custom-element!

## Install

With pnpm: 
```sh
pnpm add @overlastic/vanilla
```

With yarn:
```sh
yarn add @overlastic/vanilla
```

## Usage


### Step 1: Define Component

Create custom elements in the form of functions and return them.

```js
// overlay.ts
function Component(props) {
  const element = document.createElement('div')
  element.innerHTML = props.title

  const { resolve, reject, deferred } = usePrograms({
    // Duration of overlays duration to avoid premature destruction of the component
    duration: 1000,
  })

  // Add events that cause the overlays to end
  element.onclick = function () {
    resolve('ok')
  }

  // Use setTimeout to wait for the element to be appended, then add a class name with animation
  setTimeout(() => element.classList.add('show'))
  // When the deferred is triggered, remove the displayed class name
  deferred.finally(() => element.classList.remove('show'))

  return element
}

export default Component
```

### Step 2: Create Overlay

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlastic/vanilla'
import Component from './overlay'

// Convert to imperative callback
const callback = defineOverlay(Component)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also use `renderOverlay` to directly call the component and skip the `defineOverlay` method.

```ts
import { defineOverlay } from '@overlastic/vanilla'
import Component from './overlay'

const value = await renderOverlay(Component, {
  title: 'usePrograms'
})
// value === "usePrograms:confirmed"
```

## Custom Element

After mounting a custom element, you can pass in the corresponding custom element or name through 'defineOverlay' to use the custom element.

> You can use [lit](https://lit.dev/) Quickly build custom elements.

```ts
const callback1 = defineOverlay('my-custom-element')

callback1({/* props(attrs) */})

const CustomComponent = (props) => {
  const customElement = document.createElement('my-custom-element')

  const { resolve, reject } = usePrograms({
    duration: 1000,
  })

  // ...
  return customElement
}

const callback2 = defineOverlay(CustomComponent)
```