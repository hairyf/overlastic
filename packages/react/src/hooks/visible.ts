import type { ImperativePromiser } from '@unoverlays/utils'
import { useState } from 'react'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
  isJsx?: boolean
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const [visible, setVisible] = useState(false)

  function reject(value?: any) {
    options.promiser?.reject(value)
    setVisible(false)
  }
  function resolve(value?: any) {
    options.promiser?.resolve(value)
    setVisible(false)
  }

  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
  }

  if (options.promiser) {
    options.promiser.promise.resolve = resolve as any
    options.promiser.promise.reject = reject
  }

  return { setVisible, visible, resolve, reject, vanish, isJsx: options.isJsx }
}
