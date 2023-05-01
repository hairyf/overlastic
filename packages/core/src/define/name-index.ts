import { context } from '../internal'
import { UnifiedOverlayProviderID } from './global'

export function defineName(id = UnifiedOverlayProviderID, auto = true) {
  if (!context.spaces[id])
    context.spaces[id] = 0

  if (auto)
    return `${id}--${++context.spaces[id]}`

  return id
}

export function defineIndex(id = UnifiedOverlayProviderID) {
  return context.spaces[id] || 0
}
