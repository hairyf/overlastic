import type { AppContext, Component, InjectionKey } from 'vue-demi'
import type { UseOverlayReturn } from '../composable'

export type OptionsWapper = Component | false

export interface Options {
  wapper?: OptionsWapper
}

export const context = {
  appContext: null as null | AppContext,
  options: {
    wapper: false
  } as Options
}

export const OverlayMetaKey: InjectionKey<UseOverlayReturn> = Symbol('__imperative_overlay_key')
