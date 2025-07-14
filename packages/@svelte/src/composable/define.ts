import type { UseDisclosureReturn } from '../types'
import { getContext, setContext } from 'svelte'
import { injectOptionsKey, injectOverlayKey } from '../internal'

export interface UseDisclosureOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  setContext(injectOptionsKey, options)
  return getContext<UseDisclosureReturn>(injectOverlayKey)
}
