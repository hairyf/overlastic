<script lang="ts" setup>
import { useOverlayHolder } from '@overlastic/vue'
import { ref } from 'vue'
import Overlay from './overlay.vue'

const props = withDefaults(defineProps<{
  root?: any
  duration?: number
}>(), { root: undefined })

const [Holder, callback] = useOverlayHolder(Overlay, {
  root: props.root,
})

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
    <component :is="Holder" />
    <span class="modal__value">
      {{ result }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
