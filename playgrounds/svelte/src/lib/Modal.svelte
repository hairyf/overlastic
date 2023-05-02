<script lang="ts">
  import { delay } from "@overlays/core";
  import { injectKey, type Context } from "@overlays/svelte";
  import { getContext, onMount } from "svelte";
  import { fly } from "svelte/transition";
  
  export let title = 'Title'

  let { visible, promiser, vanish, resolve, reject } = getContext<Context>(injectKey);

  promiser.finally(async () => {
    visible = false;
    await delay(200);
    vanish();
  });

  onMount(() => (visible = true));
</script>

{#if visible}
  <div transition:fly={{ opacity: 0, duration: 200 }} class="base-modal__mask">
    <div class="base-modal__content">
      <div class="base-modal__title">{title}</div>
      <slot />
      <div class="base-modal__control">
        <button class="modal__confirm" on:click={() => resolve()}>resolve</button>
        <button class="modal__cancel" on:click={() => reject()}>reject</button>
      </div>
    </div>
  </div>
{/if}

<style scoped>
  .base-modal__mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .base-modal__content {
    position: absolute;
    border-radius: 20px;
    width: 600px;
    height: 300px;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
  }
  .base-modal__control {
    position: absolute;
    right: 0;
    bottom: 20px;
  }

  .base-modal__control button {
    margin-right: 20px;
  }
</style>
