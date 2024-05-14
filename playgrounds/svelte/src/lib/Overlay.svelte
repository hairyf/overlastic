<script lang="ts">
  import { delay } from "@overlastic/core";
  import {
    type ProgramsOptions,
    type ProgramsReturn,
  } from "@overlastic/svelte";
  import {
    injectOptionsKey,
    injectOverlayKey,
  } from '@overlastic/svelte/src/internal'
  import { getContext, onMount } from "svelte";

  export let visible = false;

  const { duration = 0 } = getContext<ProgramsOptions>(injectOptionsKey) || {};
  const { deferred, vanish } = getContext<ProgramsReturn>(injectOverlayKey);

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
