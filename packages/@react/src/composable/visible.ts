import type { Promiser } from '@overlays/core'
import { useState } from 'react'

export interface VisiblePromiseOptions {
  promiser?: Promiser
  vanish?: Function
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const { reject: _reject, resolve: _resolve } = options.promiser || {}
  const { vanish: _vanish } = options

  const [visible, setVisible] = useState(false)

  function reject(value?: any) {
    setVisible(false)
    _reject?.(value)
  }
  function resolve(value?: any) {
    setVisible(false)
    return _resolve?.(value)
  }

  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
  }

  if (options.promiser) {
    options.promiser.resolve = resolve as any
    options.promiser.reject = reject
  }

  return {
    setVisible,
    visible,
    resolve,
    reject,
    vanish,
  }
}
