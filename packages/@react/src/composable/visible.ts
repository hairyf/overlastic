import type { Promiser } from '@overlays/core'
import { useState } from 'react'

export interface VisiblePromiseOptions {
  promiser: Promiser
  vanish?: Function
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject, resolve: _resolve } = options.promiser || {}
  const { vanish: _vanish } = options

  const [visible, setVisible] = useState(false)

  function vanish() {
    _vanish?.()
    _reject?.()
  }

  return {
    resolve: options.promiser.resolve,
    reject: options.promiser.reject,
    promiser: options.promiser,
    setVisible,
    visible,
    vanish,
  }
}
