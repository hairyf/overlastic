import { ref } from 'vue-demi'
import type { ImperativePromiser } from '@overlays/core'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
}

export function useVisibleScripts(options: VisiblePromiseOptions) {
  const visible = ref(false)
  function reject(value?: any) {
    options.promiser?.reject(value)
    visible.value = false
  }
  function resolve(value?: any) {
    options.promiser?.resolve(value)
    visible.value = false
    return options.promiser?.promise
  }
  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
    return options.promiser?.promise
  }

  if (options.promiser) {
    options.promiser.promise.resolve = resolve as any
    options.promiser.promise.reject = reject
  }

  return {
    visible,
    resolve,
    reject,
    vanish,
  }
}
