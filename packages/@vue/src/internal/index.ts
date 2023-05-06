import type { AppContext, InjectionKey } from 'vue-demi'
import type { UseOverlayReturn } from '../composable'

export const context = {
  appContext: null as null | AppContext,
}

export const OverlayMetaKey: InjectionKey<UseOverlayReturn> = Symbol('__imperative_overlay_key')
