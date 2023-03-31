import type { App } from 'vue-demi'
import { context } from './helper'

const install = (app: App) => {
  context.appContext = app._context
}
const unoverlay = { install }

export type { ImperativeOverlay, RenderOptions } from './define'
export type { OverlayOptions, OverlayMeta, InjectionHolder } from './hooks'
export type { MountOptions } from './types'
export { useOverlayMeta, useInjectHolder } from './hooks'
export { defineOverlay, renderOverlay } from './define'
export { UnifiedOverlayProvider, FieldRender } from './components'
export { install }

export default unoverlay
