import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['vue-demi'],
  globalName: 'UnoverlayVue',
  clean: true,
  dts: true,
})
