<script lang="ts" setup>
import { ref } from 'vue'
import { useOverlay } from '@overlastic/vue'
import Overlay from './overlay.vue'

const props = withDefaults(defineProps<{
  root?: any
  duration?: number
}>(), { root: undefined })

const callback = useOverlay(Overlay)

const result = ref<any>()

async function getModalValue() {
  try {
    result.value = await callback({ title: 'holder-modal-title', duration: props.duration })
  }
  catch (error: any) {
    result.value = error
  }
}
</script>

<template>
  <div class="container">
    <button class="modal__open" @click="getModalValue()">
      Open Modal
    </button>
    -
    <span class="modal__value">
      {{ result }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
