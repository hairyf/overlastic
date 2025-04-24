import type { Deferred } from '@overlastic/core'
import { ref } from 'vue-demi'

export interface ScriptsOptions {
  deferred: Deferred
  vanish?: () => void
}

export function createScripts(options: ScriptsOptions) {
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
