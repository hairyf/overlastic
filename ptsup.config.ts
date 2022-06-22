import { defineConfig } from 'ptsup'

const config = defineConfig({
  assets: [
    'component.vue',
  ],
  platform: 'browser',
  minify: true,
  sourcemap: true,
})

export default config
