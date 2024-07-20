import { delay, noop } from '@overlastic/core'
import type { Dispatch, SetStateAction } from 'react'
import { useContext, useEffect } from 'react'

import { ScriptsContext } from '../internal'
import type { PropsWidthOverlays } from '../types'

export interface PromptifyEvents {
  /**
   * reject event name used by the template
   *
   * @default 'onReject'
   */
  reject?: string
  /**
   * resolve event name used by the template
   *
   * @default 'onResolve'
   */
  resolve?: string
}

export interface ExtendOverlayOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
  /**
   * pass in the required props on jsx
   */
  props?: PropsWidthOverlays

  /**
   *  fields used by jsx show
   *
   * @default 'visible'
   */
  model?: string

  /**
   * props use event name
   */
  events?: PromptifyEvents
  /**
   * whether to automatically handle components based on visible and duration
   *
   * @default true
   */
  automatic?: boolean
}

export interface ExtendOverlayReturn {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  reject: (reason?: any) => void
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  resolve: (value?: any) => void
  /** destroy the current instance (immediately) */
  vanish: () => void
  /** visible control popup display and hide */
  visible: boolean
  /** visible dispatch change */
  setVisible: Dispatch<SetStateAction<boolean>>
  /** current deferred */
  deferred?: Promise<any>
}

export function useExtendOverlay(options: ExtendOverlayOptions = {}) {
  const { immediate = true, duration = 0, automatic = true } = options
  const context = useContext(ScriptsContext)
  const dec = Reflect.get(context, 'in_dec')
  const overlay = dec ? useDeclarative(options) : context
  const { setVisible, vanish, deferred } = overlay

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  async function destroy() {
    setVisible(false)
    await delay(duration)
    vanish?.()
    return Promise.resolve()
  }
  useMount(() => immediate && setVisible(true))
  useMount(() => {
    if (!dec && automatic)
      deferred?.then(destroy).catch(destroy)
  })

  return overlay as ExtendOverlayReturn
}

function useDeclarative(options: ExtendOverlayOptions = {}) {
  const { props = {}, model = 'visible', events = {} } = options
  const { reject = 'onReject', resolve = 'onResolve' } = events

  const _reject = (value?: any) => {
    (props as any)[reject]?.(value)
  }
  const _resolve = (value?: any) => {
    (props as any)[resolve]?.(value)
  }

  return {
    reject: _reject,
    resolve: _resolve,
    visible: (props as any)[model],
    vanish: noop,
    setVisible: noop,
    deferred: undefined,
  }
}

function useMount(callback: Function = noop) {
  useEffect(() => callback(), [])
}
