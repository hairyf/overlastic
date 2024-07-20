<script lang="ts">
  import { delay } from "@overlastic/core";
  import {
    type DefineOverlayOptions,
    type DefineOverlayReturn,
  } from "@overlastic/svelte";
  import {
    injectOptionsKey,
    injectOverlayKey,
  } from '@overlastic/svelte/src/internal'
  import { getContext, onMount } from "svelte";

  export let visible = false;

  const { duration = 0 } = getContext<DefineOverlayOptions>(injectOptionsKey) || {};
  const { deferred, vanish } = getContext<DefineOverlayReturn>(injectOverlayKey);

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
