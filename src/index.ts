import type { App } from 'vue-demi'
import { context } from './internal'

export { useOverlayMeta } from './hooks/meta'

export { createOverlay, executeOverlay } from './transform'
const install = (app: App) => {
  context.appContext = app._context
}

const unoverlay = { install }

export { install }

export type { ImperativeOverlay, ExecuteOverlayOptions } from './transform'

export default unoverlay
