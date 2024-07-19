<script setup lang="ts">
import { OverlayProvider} from '@overlastic/vue'
import ProviderContainer from './components/provider-container.vue'
</script>

<template>
  <OverlayProvider>
    <ProviderContainer :duration="300" />
  </OverlayProvider>
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
