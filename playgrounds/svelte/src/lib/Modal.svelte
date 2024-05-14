<script lang="ts">
  import { useOverlay, Overlay } from "@overlastic/svelte";
  import { fly } from "svelte/transition";
  
  export let title = 'Title'
  export let duration = 200

  // duration of overlay duration, helps prevent premature component destroy
  const { resolve, reject } = useOverlay({ duration })

</script>
<Overlay>
  <div transition:fly={{ opacity: 0, duration }} class="base-modal__mask">
    <div class="base-modal__content">
      <div class="base-modal__title">
        <slot name="title">
          {title}
        </slot>
      </div>
      <slot />
      <div class="base-modal__control">
        <button class="modal__confirm" on:click={() => resolve()}>resolve</button>
        <button class="modal__cancel" on:click={() => reject()}>reject</button>
      </div>
    </div>
  </div>
</Overlay>

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
