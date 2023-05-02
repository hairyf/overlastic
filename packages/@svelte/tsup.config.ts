import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['svelte'],
  globalName: 'OverlaysSvelte',
  clean: true,
  dts: true,
})
