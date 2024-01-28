import type { App } from 'vue-demi'
import { context } from './internal'

function install(app: App) {
  context.appContext = app._context
}
const unoverlay = { install }

export type { UseOverlayOptions, UseOverlayReturn, InjectionHolder } from './composable'
export { useOverlay, useInjectHolder, useInjectProvider } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { Field, Provider, OverlaysProvider } from './components'
export { install }

export default unoverlay
