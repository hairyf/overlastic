<script lang="ts" setup>
import { ref } from 'vue'
import { useOverlayHolder } from '../../src'
import Overlay from './overlay.vue'

const props = withDefaults(defineProps<{
  root?: any
  duration?: number
}>(), { root: undefined })

const [holder, callback] = useOverlayHolder<{ title?: string; duration?: number }, string>(Overlay, props)

const result = ref<string>()

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
    <div class="modal__open" @click="getModalValue()">
      Open Modal
    </div>
    <component :is="holder" />
    <span class="modal__value">
      {{ result }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
