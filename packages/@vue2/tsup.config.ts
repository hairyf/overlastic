import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['vue'],
  globalName: 'UnoverlayUtils',
  clean: true,
  dts: true,
})
