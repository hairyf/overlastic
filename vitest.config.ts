import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import React from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    Vue(),
    React() as any,
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/test/setup.ts',
  },
})
