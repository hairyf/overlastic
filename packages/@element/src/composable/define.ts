import { context, setupOptions } from '../internal'

export interface OverlayDefineOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
}

export function useDefineOverlay(options?: OverlayDefineOptions) {
  const trigger = context.trigger
  if (!trigger)
    throw new Error('Please execute in the overlays constructor')

  setupOptions(options)
  return trigger
}
