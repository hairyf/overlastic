import type { App } from 'vue-demi'
import { defineComponent, getCurrentInstance } from 'vue-demi'
import { context } from './internal'

export { useOverlayMeta } from './meta'
export { ImperativeOverlay, createOverlay } from './transform'
export { executeOverlay } from './utils'

const install = (app: App) => {
  context.appContext = app._context
}

const unoverlay = { install }

export { install }

export const OverlayProvider = defineComponent({
  setup(_, { slots }) {
    const { appContext } = getCurrentInstance()!
    context.appContext = appContext
    return () => slots.default?.()
  },
})

export default unoverlay
