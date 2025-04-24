import type { ExtendOverlayReturn } from '../types'
import { getContext, setContext } from 'svelte'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface ExtendOverlayOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function useExtendOverlay(options: ExtendOverlayOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<ExtendOverlayReturn>(injectOverlayKey)
}
