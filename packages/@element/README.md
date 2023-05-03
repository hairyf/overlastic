# @overlays/element

create imperative overlays in the native application, support custom-element!

## Install

With pnpm: 
```sh
pnpm add @overlays/element
```

With yarn:
```sh
yarn add @overlays/element
```

## Usage


### Step 1: Define Component

Create custom elements in the form of functions and return them.

```js
// overlay.ts
function Component(props) {
  const element = document.createElement('div')
  element.innerHTML = props.title

  const { resolve, reject } = useOverlay({
    // Duration of overlays duration to avoid premature destruction of the component
    duration: 1000,
  })

  // Add events that cause the overlays to end
  element.onclick = function () {
    resolve('ok')
  }

  return element
}

export default Component
```

### Step 2: Create Overlay

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlays/element'
import Component from './overlay'

// Convert to imperative callback
const callback = defineOverlay(Component)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also use `renderOverlay` to directly call the component and skip the `defineOverlay` method.

```ts
import { defineOverlay } from '@overlays/element'
import Component from './overlay'

const value = await renderOverlay(Component, {
  title: 'useOverlay'
})
// value === "useOverlay:confirmed"
```

## Custom Element

After mounting a custom element, you can pass in the corresponding custom element or name through 'defineOverlay' to use the custom element.

> You can use [lit](https://lit.dev/) Quickly build custom elements.

```ts
const callback1 = defineOverlay('my-custom-element')

callback1({/* props(attrs) */})

const CustomComponent = (props) => {
  const customElement = document.createElement('my-custom-element')

  const { resolve, reject } = useOverlay({
    duration: 1000,
  })

  // ...
  return customElement
}

const callback2 = defineOverlay(CustomComponent)
```