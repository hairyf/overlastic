<script lang="ts">
  import { delay } from "@overlays/core";
  import {
    injectOptionsKey,
    injectOverlayKey,
    type OverlayOptions,
    type OverlayMeta,
  } from "@overlays/svelte";
  import { getContext, onMount } from "svelte";

  export let visible = false;

  const { duration = 0 } = getContext<OverlayOptions>(injectOptionsKey) || {};
  const { promiser, vanish } = getContext<OverlayMeta>(injectOverlayKey);

  promiser.finally(async () => {
    visible = false;
    await delay(duration);
    vanish();
  });

  onMount(() => (visible = true));

</script>

{#if visible}
  <slot />
{/if}
