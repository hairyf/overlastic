import type { ImperativePromiser } from '@unoverlays/core'
import mitt from 'mitt'
export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
}

export function createVisibleScripts(options: VisiblePromiseOptions) {
  const { on, off, emit } = mitt()

  function reject(this: any, value?: any) {
    options.promiser?.reject(value)
    emit('reject', value)
    return options.promiser?.promise
  }
  function resolve(this: any, value?: any) {
    options.promiser?.resolve(value)
    emit('resolve', value)
    return options.promiser?.promise
  }
  function vanish() {
    options.vanish?.()
    reject()
    off('*')
    return options.promiser?.promise
  }

  if (options.promiser) {
    options.promiser.promise.resolve = resolve as any
    options.promiser.promise.reject = reject
  }

  return {
    resolve,
    reject,
    vanish,
    on,
  }
}
