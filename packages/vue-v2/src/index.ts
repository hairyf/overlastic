import type Vue from 'vue'
import type { PluginObject } from 'vue/types/umd'
import { context } from './internal'

const install = (_ins: any, parent: any) => {
  if (parent)
    context.parent = parent
}

const unoverlay: PluginObject<Vue> = { install }

export type { ImperativeOverlay, RenderOptions } from './transform'
export { mixinOverlayMeta } from './mixins'
export type { OverlayOptions } from './mixins'
export { createOverlay, renderOverlay } from './transform'

export default unoverlay
