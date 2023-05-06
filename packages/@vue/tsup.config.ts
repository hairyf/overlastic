import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['vue-demi', 'vue'],
  globalName: 'OverlaysVue',
  clean: true,
  dts: true,
})
