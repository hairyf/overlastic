import type { App } from 'vue-demi'
import { context } from './internal'

const install = (app: App) => {
  context.appContext = app._context
}
const unoverlay = { install }

export type { ImperativeOverlay, RenderOptions } from './transform'
export type { OverlayOptions, OverlayMeta, InjectionHolder } from './hooks'
export type { MountOptions } from './types'
export { useOverlayMeta, useInjectHolder } from './hooks'
export { createOverlay, renderOverlay } from './transform'
export { UnifiedOverlayProvider } from './components'
export { install }

export default unoverlay
