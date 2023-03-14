import type { ImperativePromiser } from '@unoverlays/utils'
import mitt from 'mitt'
export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
}

export function createVisibleScripts(options: VisiblePromiseOptions) {
  const { on, off, emit } = mitt()


  function cancel(this: any, value?: any) {
    options.promiser?.reject(value)
    emit('cancel', value)
    return options.promiser?.promise
  }
  function confirm(this: any, value?: any) {
    options.promiser?.resolve(value)
    emit('confirm', value)
    return options.promiser?.promise
  }
  function vanish() {
    options.vanish?.()
    cancel()
    off('*')
    return options.promiser?.promise
  }

  if (options.promiser) {
    options.promiser.promise.confirm = confirm as any
    options.promiser.promise.cancel = cancel
  }

  return {
    confirm,
    cancel,
    vanish,
    on,
  }
}
