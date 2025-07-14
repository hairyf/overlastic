# @overlastic/svelte

create imperative overlays in the svelte application, supporting context inheritance!

## Install

With pnpm:

```sh
pnpm add @overlastic/svelte
```

With yarn:

```sh
yarn add @overlastic/svelte
```

## Usage

### Step 1: Define Component

```svelte
<script lang='ts'>
  import { Overlay, useDisclosure } from '@overlastic/svelte'
  import { fly } from 'svelte/transition'

  export let title: number
  export let duration = 200

  // duration of overlay duration, helps prevent premature component destroy
  const { confirm, cancel } = useDisclosure({ duration })

  function onClick() {
    resolve(`${title}:confirmed`)
  }
</script>

<Overlay>
  <div transition:fly={{ opacity: 0, duration }} on:click={onClick}>
    <slot name='title'>
      {title}
    </slot>
  </div>
</Overlay>
```

### Step 2: Create Overlay

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlastic/svelte'
import OverlayComponent from './overlay.svelte'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also use `renderOverlay` to directly call the component and skip the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlastic/svelte'
import OverlayComponent from './overlay.svelte'

const value = await renderOverlay(OverlayComponent, {
  title: 'useDisclosure'
})
// value === "useDisclosure:confirmed"
```

## Controlled manner

By default, you do not need to control the display and hiding of the `visible` variable. The value is controlled by the component `Overlay`, and you can pass in `visible` to control the display

```svelte
<script lang='ts'>
  import { Overlay, useDisclosure } from '@overlastic/svelte'

  let visible = false

  const { resolve, reject, deferred, vanish } = useDisclosure({
    // close the transition duration, at this point you need to manually destroy it
    duration: false,
    // cancel setting visible to true immediately
    immediate: false,
  })

  // Manually set vanish (when promise ends)
  deferred.finally(() => vanish())
</script>

<Overlay bind:visible={visible}>
  <div on:click={() => resolve(`${title}:confirmed`)}>
    ...
  </div>
</Overlay>
```
