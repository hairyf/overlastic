import { context, setupOptions } from '../internal'

export interface ExtendOverlayOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
}

export function useDisclosure(options?: ExtendOverlayOptions) {
  const trigger = context.trigger
  if (!trigger)
    throw new Error('Please execute in the overlays constructor')

  setupOptions(options)
  return trigger
}
