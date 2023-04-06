import { UnifiedOverlayProviderID } from './global'

export const NAME_SPACES: Record<string, number> = {}

export function noop() {}

export function allowed() {
  throw new Error('overlay - Error: It is not allowed to call resolve and reject externally immediately, please wait for the component to render')
}

export function delay(milliseconds?: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function varName(id = UnifiedOverlayProviderID, auto = true) {
  if (!NAME_SPACES[id])
    NAME_SPACES[id] = 0

  if (auto)
    return `${id}--${++NAME_SPACES[id]}`

  return id
}
