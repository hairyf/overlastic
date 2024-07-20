import { getContext, setContext } from 'svelte'
import type { DefineOverlayReturn } from '../types'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface DefineOverlayOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function useDefineOverlay(options: DefineOverlayOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<DefineOverlayReturn>(injectOverlayKey)
}
