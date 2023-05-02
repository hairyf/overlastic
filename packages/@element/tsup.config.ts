import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  globalName: 'OverlaysVanilla',
  clean: true,
  dts: true,
})
