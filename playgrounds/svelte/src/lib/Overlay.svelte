<script lang="ts">
  import { delay } from "@overlastic/core";
  import {
    type UseOverlayOptions,
    type UseOverlayReturn,
  } from "@overlastic/svelte";
  import {
    injectOptionsKey,
    injectOverlayKey,
  } from '@overlastic/svelte/src/internal'
  import { getContext, onMount } from "svelte";

  export let visible = false;

  const { duration = 0 } = getContext<UseOverlayOptions>(injectOptionsKey) || {};
  const { deferred, vanish } = getContext<UseOverlayReturn>(injectOverlayKey);

  deferred.finally(async () => {
    visible = false;
    await delay(duration);
    vanish();
  });

  onMount(() => (visible = true));

</script>

{#if visible}
  <slot />
{/if}
