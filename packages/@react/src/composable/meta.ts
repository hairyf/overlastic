import { delay as _delay, noop } from '@overlays/core'
import type { Dispatch, SetStateAction } from 'react'
import { useContext, useEffect } from 'react'

import { Context } from '../internal'
import type { PropsWidthOverlays } from '../types'

export interface OverlayEvents {
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

export interface OverlayOptions {
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
  events?: OverlayEvents
  /**
   * whether to automatically handle components based on visible and duration
   *
   * @default true
   */
  automatic?: boolean
}

export interface OverlayMeta {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  reject: Function
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  resolve: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  visible: boolean
  /** visible dispatch change */
  setVisible: Dispatch<SetStateAction<boolean>>
  /** current deferred */
  deferred?: Promise<any>
}

export function useOverlay(options: OverlayOptions = {}) {
  const { immediate = true, duration = 0, automatic = true } = options
  const context = useContext(Context)
  const dec = Reflect.get(context, 'in_dec')
  const meta = dec ? useDeclarative(options) : context

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  useMount(() => {
    immediate && meta.setVisible?.(true)
    if (!dec && automatic) {
      meta.deferred?.finally(async () => {
        meta.setVisible(false)
        await _delay(duration)
        meta.vanish?.()
      })
    }
  })

  return meta
}

export function useDeclarative(options: OverlayOptions = {}) {
  const { props = {}, model = 'visible', events = {} } = options
  const { reject = 'onReject', resolve = 'onResolve' } = events

  const _reject = (value?: any) => {
    props[reject]?.(value)
  }
  const _resolve = (value?: any) => {
    props[resolve]?.(value)
  }

  return {
    reject: _reject,
    resolve: _resolve,
    visible: props[model],
    vanish: noop,
    setVisible: noop,
    deferred: undefined,
  }
}

export function useMount(callback: Function = noop) {
  useEffect(() => callback(), [])
}
