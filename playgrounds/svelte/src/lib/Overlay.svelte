<script lang='ts'>
  import type { ExtendOverlayOptions, ExtendOverlayReturn } from '@overlastic/svelte'
  import { delay } from '@overlastic/core'
  import {
    injectOptionsKey,
    injectOverlayKey,
  } from '@overlastic/svelte/src/internal'
  import { getContext, onMount } from 'svelte'

  export let visible = false

  const { duration = 0 } = getContext<ExtendOverlayOptions>(injectOptionsKey) || {}
  const { deferred, vanish } = getContext<ExtendOverlayReturn>(injectOverlayKey)

  deferred?.finally(async () => {
    visible = false
    await delay(duration)
    vanish()
  })

  onMount(() => (visible = true))

</script>

{#if visible}
  <slot />
{/if}
