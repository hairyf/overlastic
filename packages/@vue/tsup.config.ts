import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['vue-demi'],
  globalName: 'OverlaysVue',
  clean: true,
  dts: true,
})
