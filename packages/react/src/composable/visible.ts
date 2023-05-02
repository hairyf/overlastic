import type { ImperativePromiser } from '@overlays/core'
import { useState } from 'react'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const [visible, setVisible] = useState(false)

  function reject(value?: any) {
    options.promiser?.reject(value)
    setVisible(false)
    return options.promiser?.promise
  }
  function resolve(value?: any) {
    options.promiser?.resolve(value)
    setVisible(false)
    return options.promiser?.promise
  }

  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
  }

  if (options.promiser) {
    options.promiser.promise.resolve = resolve as any
    options.promiser.promise.reject = reject
  }

  return {
    setVisible,
    visible,
    resolve,
    reject,
    vanish,
  }
}
