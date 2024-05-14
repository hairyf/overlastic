import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'xxx',
    },
    rollupOptions: {
      external: ['svelte', '@overlastic/svelte', '@overlastic/core', 'svelte-check'],
    },
    minify: false,
  },
})
