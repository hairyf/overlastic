import { ref } from 'vue-demi'
import type { Promiser } from '@overlays/core'

export interface VisiblePromiseOptions {
  promiser?: Promiser
  vanish?: Function
}

export function useVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject, resolve: _resolve } = options.promiser || {}
  const { vanish: _vanish } = options

  const visible = ref(false)

  function reject(value?: any) {
    visible.value = false
    _reject?.(value)
  }
  function resolve(value?: any) {
    visible.value = false
    return _resolve?.(value)
  }
  function vanish() {
    _vanish?.()
    reject()
  }

  if (options.promiser) {
    options.promiser.resolve = resolve as any
    options.promiser.reject = reject
  }

  return {
    visible,
    resolve,
    reject,
    vanish,
  }
}
