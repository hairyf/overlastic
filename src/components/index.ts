import type { Component } from 'vue-demi'
import { defineComponent, getCurrentInstance } from 'vue-demi'
import { context } from '../internal'

export const UnifiedOverlayProvider = defineComponent({
  setup(_, { slots }) {
    const { appContext } = getCurrentInstance()!
    context.appContext = appContext
    return () => slots.default?.()
  },
}) as Component
