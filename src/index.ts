import type { App } from 'vue-demi'
import { context } from './internal'

const install = (app: App) => {
  context.appContext = app._context
}
const unoverlay = { install }

export type { ImperativeOverlay, RenderOptions } from './transform'
export { useOverlayMeta, OverlayMetaOptions } from './hooks'
export { createOverlay, renderOverlay } from './transform'
export { install }

export default unoverlay
