import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['react', 'react-dom'],
  globalName: 'UnoverlayUtils',
  clean: true,
  dts: true,
})
