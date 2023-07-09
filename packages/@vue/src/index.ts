import type { App } from 'vue-demi'
import { context } from './internal'
import type { Options } from './internal'

const install = (app: App, options: Options = {}) => {
  context.appContext = app._context
  context.options = options
}
const unoverlay = { install }

export type { UseOverlayOptions, UseOverlayReturn, InjectionHolder } from './composable'
export { useOverlay, useInjectHolder } from './composable'
export { defineOverlay, renderOverlay } from './define'
export { Provider, Field } from './components'
export { install }

export default unoverlay
