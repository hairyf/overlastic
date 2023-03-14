import type { ImperativePromiser } from '@unoverlays/utils'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
}

export function createVisibleScripts(options: VisiblePromiseOptions) {
  function cancel(this: any, value?: any) {
    options.promiser?.reject(value)
  }
  function confirm(this: any, value?: any) {
    options.promiser?.resolve(value)
    return options.promiser?.promise
  }
  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
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
  }
}
