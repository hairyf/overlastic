import type Vue from 'vue'
import type { PluginObject } from 'vue/types/umd'
import { context } from './helper'

const install = (_ins: any, parent: any) => {
  if (parent)
    context.parent = parent
}

const unoverlay: PluginObject<Vue> = { install }

export type { ImperativeOverlay, RenderOptions } from './define'
export { useOverlayMeta } from './hooks'
export type { OverlayOptions } from './hooks'
export { defineOverlay, renderOverlay } from './define'
export { FieldRender } from './components'

export default unoverlay
export { install }
