import type { App } from 'vue-demi'
import { context } from './internal'

const install = (app: App) => {
  context.appContext = app._context
}
const unoverlay = { install }

export type { OverlayOptions, OverlayMeta, InjectionHolder } from './composable'
export { useOverlay, useInjectHolder } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { UnifiedOverlayProvider, FieldRender } from './components'
export { install }

export default unoverlay
