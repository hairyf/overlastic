import type { Deferred } from '@overlays/core'
import { useState } from 'react'

export interface VisiblePromiseOptions {
  deferred: Deferred
  vanish?: Function
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject, resolve: _resolve } = options.deferred || {}
  const { vanish: _vanish } = options

  const [visible, setVisible] = useState(false)

  function vanish() {
    _vanish?.()
    _reject?.()
  }

  return {
    resolve: options.deferred.resolve,
    reject: options.deferred.reject,
    deferred: options.deferred,
    setVisible,
    visible,
    vanish,
  }
}
