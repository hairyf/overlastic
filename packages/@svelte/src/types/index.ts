import type { Deferred } from '@overlastic/core'

export interface DefineOverlayReturn {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  reject: (reason?: any) => void
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  resolve: (value?: any) => void
  /** destroy the current instance (immediately) */
  vanish: () => void
  /** visible control popup display and hide */
  /** current deferred */
  deferred?: Deferred<any>
}
