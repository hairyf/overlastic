import { defineConfig } from 'tsup'

const config = defineConfig({
  entry: [
    'src/*.ts',
  ],
  format: ['cjs', 'esm'],
  platform: 'browser',
  dts: true,
  splitting: true,
  clean: true,
  shims: false,
})

export default config

