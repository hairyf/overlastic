import type { Dispatch, SetStateAction } from 'react'

export interface OverlayOptions {
  /** animation duration to avoid premature destruction of components */
  animation?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
  /**
   * template use event name
   */
  event?: {
    /**
   * cancel event name used by the template
   *
   * @default 'cancel'
   */
    cancel?: string
    /**
   * confirm event name used by the template
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
