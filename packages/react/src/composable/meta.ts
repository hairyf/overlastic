import { delay as _delay, noop } from '@overlays/core'
import type { Dispatch, SetStateAction } from 'react'
import { useContext, useEffect } from 'react'

import { OverlayContext } from '../internal'
import type { PropsWidthOverlays } from '../types'

export interface OverlayOptions {
  /** animation duration to avoid premature destruction of components */
  animation?: number
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
   * jsx use event name
   */
  event?: {
    /**
     * reject event name used by the jsx
     *
     * @default 'onReject'
     */
    reject?: string
    /**
     * resolve event name used by the jsx
     *
     * @default 'onResolve'
     */
    resolve?: string
  }
  /**
   * whether to automatically handle components based on visible and animation
   *
   * @default true
   */
  automatic?: boolean
}

export interface OverlayMeta {
  /** the notification reject, modify visible, and destroy it after the animation ends */
  reject: Function
  /** the notification resolve, modify visible, and destroy it after the animation ends */
  resolve: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  visible: boolean
  /** visible dispatch change */
  setVisible: Dispatch<SetStateAction<boolean>>
  /** use in jsx */
  inDec?: boolean
}

export function useOverlayMeta(options: OverlayOptions = {}) {
  const { immediate = true } = options
  const context = useContext(OverlayContext)
  const meta = context.inDec ? useDeclarativeMeta(options) : context

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  automatic(meta, options)

  useMount(() => {
    if (immediate)
      meta.setVisible?.(true)
  })
  return meta
}

export function useDeclarativeMeta(options: OverlayOptions = {}) {
  const { props = {}, model = 'visible', event = {} } = options
  const { reject = 'onReject', resolve = 'onResolve' } = event

  const _reject = (value?: any) => {
    props[reject]?.(value)
  }
  const _resolve = (value?: any) => {
    props[resolve]?.(value)
  }

  return {
    reject: _reject,
    resolve: _resolve,
    vanish: noop,
    visible: props[model],
    setVisible: noop,
  }
}

export function useMount(callback: Function = noop) {
  useEffect(() => callback(), [])
}

export function automatic(meta: OverlayMeta, options: OverlayOptions) {
  const { animation = 0, automatic = true } = options
  async function delay() {
    if (!automatic)
      return
    if (animation > 0)
      await _delay(animation)
    meta.vanish?.()
  }

  for (const key of ['resolve', 'reject'] as const) {
    const affirm = meta[key]
    meta[key] = function (value: any) {
      affirm(value)
      delay()
    }
  }
}
