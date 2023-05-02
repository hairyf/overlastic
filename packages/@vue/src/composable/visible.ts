import { ref } from 'vue-demi'
import type { Promiser } from '@overlays/core'

export interface VisiblePromiseOptions {
  promiser: Promiser
  vanish?: Function
}

export function useVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject } = options.promiser || {}
  const { vanish: _vanish } = options

  const visible = ref(false)

  function vanish() {
    _vanish?.()
    _reject?.()
  }

  return {
    resolve: options.promiser.resolve,
    reject: options.promiser.reject,
    promiser: options.promiser,
    visible,
    vanish,
  }
}
