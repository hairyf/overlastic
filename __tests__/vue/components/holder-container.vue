<script lang="ts" setup>
import { useInjectHolder } from '@unoverlays/vue'
import { ref } from 'vue'
import Overlay from './overlay.vue'

const props = withDefaults(defineProps<{
  root?: any
  animation?: number
}>(), { root: undefined })

const [callback, holder] = useInjectHolder<{ title?: string; animation?: number }, string>(Overlay, props)

async function getModalValue() {
  try {
    result.value = await callback({ title: 'holder-modal-title', animation: props.animation })
  }
  catch (error: any) {
    result.value = error
  }
}

const result = ref<string>()
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
