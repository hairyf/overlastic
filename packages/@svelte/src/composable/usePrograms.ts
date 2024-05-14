import { getContext, setContext } from 'svelte'
import type { ProgramsReturn } from '../types'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface ProgramsOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function usePrograms(options: ProgramsOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<ProgramsReturn>(injectOverlayKey)
}
