import type { App } from 'vue-demi'
import { context } from './internal'

function install(app: App) {
  context.appContext = app._context
}
const unoverlay = { install }

export { Field, OverlaysProvider } from './components'
export type { ExtendOverlayOptions, ExtendOverlayReturn, InjectionHolder } from './composable'
export { useExtendOverlay, useOverlayHolder, useOverlayInject } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { install }

export default unoverlay
