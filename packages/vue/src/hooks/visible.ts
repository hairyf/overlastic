import type { Ref } from 'vue-demi'
import type { Emitter } from 'mitt'
import type { ImperativePromiser } from '@unoverlays/utils'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
  events?: Emitter<any>
}

export function useVisibleScripts(visible: Ref<boolean>, options: VisiblePromiseOptions) {
  function cancel(value?: any) {
    options.promiser?.reject(value)
    visible.value = false
  }
  function confirm(value?: any) {
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
    options.promiser.promise.confirm = confirm as any
    options.promiser.promise.cancel = cancel
  }

  return { visible, confirm, cancel, vanish }
}
