import type { AppContext, InjectionKey, Ref } from 'vue-demi'

export const context = {
  appContext: null as null | AppContext,
}

export interface OverlayMeta {
  /** the notification cancel, modify visible, and destroy it after the animation ends */
  cancel: Function
  /** the notification confirm, modify visible, and destroy it after the animation ends */
  confirm: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  visible: Ref<boolean>
  /** use in template */
  isTemplate?: boolean
}

export const OverlayMetaKey: InjectionKey<OverlayMeta> = Symbol('__imperative_overlay_key')
