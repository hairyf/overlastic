import { getContext, setContext } from 'svelte'
import type { OverlayMeta } from '../types'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface OverlayOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function useOverlay(options: OverlayOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<OverlayMeta>(injectOverlayKey)
}
