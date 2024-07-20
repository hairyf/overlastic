import type { ExtendOverlayOptions } from '../composable'
import type { Context } from '../types'

export const context = {
  trigger: undefined as Context | undefined,
  options: undefined as ExtendOverlayOptions | undefined,
}

export function setupTrigger(c: Context) {
  context.trigger = c
}

export function clearTrigger() {
  context.trigger = undefined
}

export function setupOptions(o: ExtendOverlayOptions = {}) {
  context.options = o
}

export function clearOptions() {
  context.options = undefined
}

export function useOptions() {
  return context.options || {}
}
