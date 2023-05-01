import type { AppContext, InjectionKey } from 'vue-demi'
import type { OverlayMeta } from '../composable'

export const context = {
  appContext: null as null | AppContext,
}

export const OverlayMetaKey: InjectionKey<OverlayMeta> = Symbol('__imperative_overlay_key')
