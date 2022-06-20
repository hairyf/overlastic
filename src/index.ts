import { App } from 'vue'
import { context } from './global'

export { useOverlayMeta } from './meta'
export { ImperativeOverlay, transformOverlay } from './transform'
export { useOverlayComp } from './utils'

const install = (app: App) => {
  context.parent = app._context
}
const UnoverlayVue = { install }

export { install }

export default UnoverlayVue