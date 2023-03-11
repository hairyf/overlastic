import { UnifiedOverlayProviderID } from './global'

export function noop() {}

export function allowed() {
  throw new Error('overlay - Error: It is not allowed to call confirm and cancel externally immediately, please wait for the component to render')
}

export function delay(milliseconds?: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function varName(id = UnifiedOverlayProviderID, auto = true) {
  if (auto)
    return `${id}--${varName.index++}`

  return id
}

varName.index = 1
