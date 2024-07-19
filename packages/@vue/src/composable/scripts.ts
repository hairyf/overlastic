import { ref } from 'vue-demi'
import type { Deferred } from '@overlastic/core'

export interface ScriptsOptions {
  deferred: Deferred
  vanish?: Function
}

export function useScripts(options: ScriptsOptions) {
  const { reject: _reject } = options.deferred || {}
  const { vanish: _vanish } = options

  const visible = ref(false)

  function vanish() {
    _vanish?.()
    _reject?.()
  }

  return {
    resolve: options.deferred.resolve,
    reject: options.deferred.reject,
    deferred: options.deferred,
    visible,
    vanish,
  }
}
