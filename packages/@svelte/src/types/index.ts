import type { Promiser } from '@overlays/core'

export interface OverlayMeta {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  reject: Function
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  resolve: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  /** current promiser */
  promiser?: Promiser<any>
}
