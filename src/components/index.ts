import { defineComponent, getCurrentInstance } from 'vue'
import { context } from '../internal'

export const OverlayProvider = defineComponent({
  setup(_, { slots }) {
    const { appContext } = getCurrentInstance()!
    context.appContext = appContext
    return () => slots.default?.()
  },
})
