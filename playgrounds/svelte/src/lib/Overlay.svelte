<script lang="ts">
  import { delay } from "@overlays/core";
  import {
    type OverlayOptions,
    type OverlayMeta,
  } from "@overlays/svelte";
  import {
    injectOptionsKey,
    injectOverlayKey,
  } from '@overlays/svelte/src/internal'
  import { getContext, onMount } from "svelte";

  export let visible = false;

  const { duration = 0 } = getContext<OverlayOptions>(injectOptionsKey) || {};
  const { deferred, vanish } = getContext<OverlayMeta>(injectOverlayKey);

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
