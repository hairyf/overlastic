import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  external: ['react', 'react-dom'],
  globalName: 'UnoverlayReact',
  clean: true,
  dts: true,
})
