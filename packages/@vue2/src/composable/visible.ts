import type { Deferred } from '@overlays/core'
import mitt from 'mitt'
export interface VisiblePromiseOptions {
  deferred?: Deferred
  vanish?: Function
}

export function createVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject, resolve: _resolve } = options.deferred || {}
  const { vanish: _vanish } = options

  const { on, off, emit } = mitt()

  function reject(this: any, value?: any) {
    emit('reject', value)
    _reject?.(value)
  }
  function resolve(this: any, value?: any) {
    options.deferred?.resolve(value)
    emit('resolve', value)
    return _resolve?.(value)
  }
  function vanish() {
    _vanish?.()
    reject()
    off('*')
  }

  if (options.deferred) {
    options.deferred.resolve = resolve as any
    options.deferred.reject = reject
  }

  return {
    resolve,
    reject,
    vanish,
    on,
  }
}
