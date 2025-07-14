import type { App } from 'vue-demi'
import { context } from './internal'

function install(app: App) {
  context.appContext = app._context
}
const unoverlay = { install }

export { Field, OverlaysProvider } from './components'
export type { UseDisclosureOptions, UseDisclosureReturn, InjectionHolder } from './composable'
export { useDisclosure, useOverlay } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { install }

export default unoverlay
