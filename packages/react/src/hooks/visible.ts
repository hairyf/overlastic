import type { ImperativePromiser } from '@unoverlays/utils'
import { useState } from 'react'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
  isJsx?: boolean
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const [visible, setVisible] = useState(false)

  function cancel(value?: any) {
    options.promiser?.reject(value)
    setVisible(false)
  }
  function confirm(value?: any) {
    options.promiser?.resolve(value)
    setVisible(false)
  }

  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
  }

  if (options.promiser) {
    options.promiser.promise.confirm = confirm as any
    options.promiser.promise.cancel = cancel
  }

  return { setVisible, visible, confirm, cancel, vanish, isJsx: options.isJsx }
}
