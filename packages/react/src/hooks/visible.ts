import type { Emitter } from 'mitt'
import type { ImperativePromiser } from '@unoverlays/utils'
import { useState } from 'react'
import { OverEvents } from '../internal'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
  events?: Emitter<any>
  isJsx?: boolean
}
export function useVisibleScripts(options: VisiblePromiseOptions) {
  const [visible, setVisible] = useState(false)

  function cancel(value?: any) {
    options.promiser?.reject(value)
    options.events?.emit(OverEvents.Cancel, value)
    setVisible(false)
  }
  function confirm(value?: any) {
    options.promiser?.resolve(value)
    options.events?.emit(OverEvents.Confirm, value)
    setVisible(false)
  }

  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
  }

  if (options.promiser) {
    options.promiser.promise.confirm = confirm
    options.promiser.promise.cancel = cancel
  }

  return { setVisible, visible, confirm, cancel, vanish, isJsx: options.isJsx }
}
