import type { AppContext, InjectionKey } from 'vue-demi'
import { createContext } from '@overlays/core'
import type { OverlayMeta } from '../composable'

export const context = createContext({
  appContext: null as null | AppContext,
})

export const OverlayMetaKey: InjectionKey<OverlayMeta> = Symbol('__imperative_overlay_key')
