import { getContext, setContext } from 'svelte'
import type { ProgramsReturn } from '../types'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface OverlayDefineOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function useDefineOverlay(options: OverlayDefineOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<ProgramsReturn>(injectOverlayKey)
}
