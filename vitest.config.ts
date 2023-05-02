import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import React from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    Vue(),
    React() as any,
  ],
  test: {
    dangerouslyIgnoreUnhandledErrors: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
  },
})
