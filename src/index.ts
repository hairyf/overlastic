import type { App } from 'vue-demi'
import { context } from './internal'

const install = (app: App) => {
  context.appContext = app._context
}

const unoverlay = { install }

export { install }

export type { ImperativeOverlay, RenderOptions } from './transform'
export { useOverlayMeta, UseOverlayMetaOptions } from './hooks/meta'
export { createOverlay, renderOverlay } from './transform'
export default unoverlay
