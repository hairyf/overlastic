import { getContext, setContext } from 'svelte'
import type { UseOverlayReturn } from '../types'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface UseOverlayOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function useOverlay(options: UseOverlayOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<UseOverlayReturn>(injectOverlayKey)
}
