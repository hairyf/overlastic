import { App } from 'vue'
import { context } from './global'

export { useOverlayMeta } from './meta'
export { ImperativeOverlay, transformOverlayMethod } from './transform'
export { useOverlayCall } from './utils'

const install = (app: App) => {
  context.parent = app._context
}
const unoverlay = { install }

export { install }

export default unoverlay