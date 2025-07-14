import type { Deferred } from '@overlastic/core'
import mitt from 'mitt'

export interface ScriptsOptions {
  deferred?: Deferred
  vanish?: () => void
}

export function createVisibleScripts(options: ScriptsOptions) {
  const { cancel: _cancel, confirm: _confirm } = options.deferred || {}
  const { vanish: _vanish } = options

  const { on, off, emit } = mitt()

  function cancel(this: any, value?: any) {
    emit('cancel', value)
    _cancel?.(value)
  }
  function confirm(this: any, value?: any) {
    options.deferred?.confirm(value)
    emit('confirm', value)
    return _confirm?.(value)
  }
  function vanish() {
    _vanish?.()
    cancel()
    off('*')
  }

  if (options.deferred) {
    options.deferred.confirm = confirm as any
    options.deferred.cancel = cancel
  }

  return {
    confirm,
    cancel,
    vanish,
    on,
  }
}
