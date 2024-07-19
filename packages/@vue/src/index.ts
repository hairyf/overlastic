import type { App } from 'vue-demi'
import { context } from './internal'

function install(app: App) {
  context.appContext = app._context
}
const unoverlay = { install }

export type { OverlayDefineOptions, ProgramsReturn, InjectionHolder } from './composable'
export { useOverlayDefine, useOverlayHolder, useOverlay } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { Field, OverlayProvider } from './components'
export { install }

export default unoverlay
