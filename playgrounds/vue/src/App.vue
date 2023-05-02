<script setup lang="ts">
import { defineOverlay } from '@overlays/vue'
import HolderContainer from './components/holder-container.vue'
import Overlay from './components/overlay.vue'
const callback = defineOverlay<unknown, string>(Overlay)

const inst = callback()
</script>

<template>
  <HolderContainer :duration="300" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
