import type { Promiser } from '@overlays/core'
import mitt from 'mitt'
export interface VisiblePromiseOptions {
  promiser?: Promiser
  vanish?: Function
}

export function createVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject, resolve: _resolve } = options.promiser || {}
  const { vanish: _vanish } = options

  const { on, off, emit } = mitt()

  function reject(this: any, value?: any) {
    emit('reject', value)
    _reject?.(value)
  }
  function resolve(this: any, value?: any) {
    options.promiser?.resolve(value)
    emit('resolve', value)
    return _resolve?.(value)
  }
  function vanish() {
    _vanish?.()
    reject()
    off('*')
  }

  if (options.promiser) {
    options.promiser.resolve = resolve as any
    options.promiser.reject = reject
  }

  return {
    resolve,
    reject,
    vanish,
    on,
  }
}
