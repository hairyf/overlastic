<script lang="ts" setup>
import { ref } from 'vue'
import { useInjectHolder } from '../../src'
import Overlay from './overlay.vue'

const props = withDefaults(defineProps<{
  root?: any
  animation?: number
}>(), { root: undefined })

const [holder, callback] = useInjectHolder<{ title?: string; animation?: number }, string>(Overlay, props)

const result = ref<string>()

async function getModalValue() {
  try {
    result.value = await callback({ title: 'holder-modal-title', animation: props.animation })
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
