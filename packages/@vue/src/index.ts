import type { App } from 'vue-demi'
import { context } from './internal'

function install(app: App) {
  context.appContext = app._context
}
const unoverlay = { install }

export type { ProgramsOptions, ProgramsReturn, InjectionHolder } from './composable'
export { usePrograms, useOverlayHolder, useOverlay } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { Field, Provider, OverlaysProvider } from './components'
export { install }

export default unoverlay
