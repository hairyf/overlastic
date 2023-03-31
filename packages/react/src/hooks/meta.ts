import { delay as _delay, noop } from '@unoverlays/utils'
import type { Dispatch, SetStateAction } from 'react'
import { useContext, useEffect } from 'react'

import { OverlayContext } from '../helper'
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
     * cancel event name used by the jsx
     *
     * @default 'cancel'
     */
    cancel?: string
    /**
     * confirm event name used by the jsx
     *
     * @default 'confirm'
     */
    confirm?: string
  }
  /**
   * whether to automatically handle components based on visible and animation
   *
   * @default true
   */
  automatic?: boolean
}

export interface OverlayMeta {
  /** the notification cancel, modify visible, and destroy it after the animation ends */
  cancel: Function
  /** the notification confirm, modify visible, and destroy it after the animation ends */
  confirm: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  visible: boolean
  /** visible dispatch change */
  setVisible: Dispatch<SetStateAction<boolean>>
}

export function useOverlayMeta(options: OverlayOptions = {}) {
  const { immediate = true } = options
  const meta = useContext(OverlayContext)

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  automatic(meta, options)

  useMount(() => {
    if (immediate)
      meta.setVisible?.(true)
  })
  return meta
}

export function useJSXMeta(options: OverlayOptions = {}) {
  const { props = {}, model = 'visible', event = {} } = options
  const { cancel = 'onCancel', confirm = 'onConfirm' } = event

  const _cancel = (value?: any) => {
    props[cancel]?.(value)
  }
  const _confirm = (value?: any) => {
    props[confirm]?.(value)
  }

  return {
    cancel: _cancel,
    confirm: _confirm,
    vanish: noop,
    visible: props[model],
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
  for (const key of ['confirm', 'cancel'] as const) {
    const affirm = meta[key]
    meta[key] = function (value: any) {
      affirm(value)
      delay()
    }
  }
}
