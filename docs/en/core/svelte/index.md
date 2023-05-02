# @overlays/svelte

create imperative overlays in the svelte application, supporting context inheritance!

## Install

With pnpm: 
```sh
pnpm add @overlays/svelte
```

With yarn:
```sh
yarn add @overlays/svelte
```

## Usage


### Step 1: Define Component

overlays is suitable for most components. Using useOverlay can provide finer control over the component process.

```svelte
<script lang="ts">
  import { delay } from "@overlays/core";
  import { injectKey, Context } from "@overlays/core";
  import { getContext, onMount } from "svelte";
  import { fly } from "svelte/transition";
  
  export let title: number

  // obtain controller for overlays
  let { 
    visible,
    promiser,
    vanish,
    resolve,
    reject
  } = getContext<Context>(injectKey);

  // modify variables and wait for destruction when promise ends
  promiser.finally(async () => {
    visible = false;
    await delay(200);
    vanish();
  });

  // initialize display overlays
  onMount(() => (visible = true));
</script>

{#if visible}
  <div 
    transition:fly={{ opacity: 0, duration: 200 }} 
    on:click={resolve(`${title}:confirmed`)}
  >
    { title }
  </div>
{/if}
```

### Step 2: Create Overlay

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlays/svelte'
import OverlayComponent from './overlay.svelte'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the resolve callback
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can also use `renderOverlay` to directly call the component and skip the `defineOverlay` method.

```ts
import { renderOverlay } from '@overlays/svelte'
import OverlayComponent from './overlay.svelte'

const value = await renderOverlay(OverlayComponent, {
  title: 'useOverlay'
})
// value === "useOverlay:confirmed"
```
