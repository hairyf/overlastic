import { delay, noop } from '@unoverlays/utils'
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
   * jsx use event name
   */
  field?: {
    /**
     *show overlay field
     */
    visible?: string
    /**
     * cancel event name used by the jsx
     *
     * @default 'cancel'
     */
    onCancel?: string
    /**
     * confirm event name used by the jsx
     *
     * @default 'confirm'
     */
    onConfirm?: string
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
  /** use in jsx */
  isJsx?: boolean
}

export function useOverlayMeta(options: OverlayOptions = {}) {
  const { animation = 0, immediate = true, automatic = true } = options
  const meta = useContext(OverlayContext) || useJSXMeta()

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.

  async function autoClose() {
    if (meta.visible)
      return
    if (animation > 0)
      await delay(animation)
    meta.vanish?.()
  }

  if (!meta.isJsx && automatic) {
    useEffect(() => {
      autoClose()
    }, [meta.visible])
  }

  if (immediate)
    useEffect(() => meta.setVisible?.(true), [])
}

export function useJSXMeta(options: OverlayOptions = {}) {
  const { props = {}, field = {} } = options
  const {
    onCancel = 'onCancel',
    onConfirm = 'onConfirm',
    visible: value = 'visible',
  } = field

  const cancel = (value?: any) => {
    props[onCancel]?.(value)
  }
  const confirm = (value?: any) => {
    props[onConfirm]?.(value)
  }

  return {
    cancel,
    confirm,
    vanish: noop,
    visible: props[value],
    isTemplate: true,
  }
}
