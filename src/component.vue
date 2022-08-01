<script>
import { defineComponent } from 'vue-demi'
import { useOverlayMeta } from './index.esm'
export default defineComponent({
  setup: () => {
    const { confirm, cancel, vanish } = useOverlayMeta({
      animation: 2000,
    })
    return { confirm, cancel, vanish }
  },
})
</script>

<template>
  <teleport to="body">
    <!-- after-leave call vanish -->
    <transition name="fade" @after-leave="vanish">
      <div v-show="vanish" class="base-model__mask">
        <div class="base-model__content">
          <div>model~~~</div>
          <slot />
          <div class="base-model__control">
            <span @click="confirm()">confirm</span>
            <span @click="cancel()">cancel</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.base-model__mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.base-model__content {
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
.base-model__control {
  position: absolute;
  right: 0;
  bottom: 20px;
  span {
    margin-right: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-top,
.fade-leave-from {
  opacity: 1;
}
</style>
