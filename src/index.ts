import type { App } from 'vue'
import { context } from './internal'

export { useOverlayMeta } from './meta'
export { ImperativeOverlay, transformOverlay } from './transform'
export { useOverlayCall } from './utils'

const install = (app: App) => {
  context.appContext = app._context
}
const unoverlay = { install }
export { install }
export default unoverlay
