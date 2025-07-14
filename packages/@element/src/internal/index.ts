import type { UseDisclosureOptions } from '../composable'
import type { Context } from '../types'

export const context = {
  trigger: undefined as Context | undefined,
  options: undefined as UseDisclosureOptions | undefined,
}

export function setupTrigger(c: Context) {
  context.trigger = c
}

export function clearTrigger() {
  context.trigger = undefined
}

export function setupOptions(o: UseDisclosureOptions = {}) {
  context.options = o
}

export function clearOptions() {
  context.options = undefined
}

export function useOptions() {
  return context.options || {}
}
