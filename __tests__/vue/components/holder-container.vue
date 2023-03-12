<script lang="ts" setup>
import { useInjectHolder } from '@unoverlays/vue'
import { ref } from 'vue'
import Overlay from './overlay.vue'

const props = withDefaults(defineProps<{
  root?: any
}>(), { root: undefined })

const [callback, holder] = useInjectHolder<{ title?: string }, string>(Overlay, props)

async function getModalValue() {
  result.value = await callback({ title: 'holder-modal-title' })
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
