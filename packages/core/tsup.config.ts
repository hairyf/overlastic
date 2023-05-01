import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  globalName: 'overlayCore',
  clean: true,
  dts: true,
})
