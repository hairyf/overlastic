import type { Deferred } from '@overlastic/core'

export interface UseDisclosureReturn {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  cancel: (reason?: any) => void
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  confirm: (value?: any) => void
  /** destroy the current instance (immediately) */
  vanish: () => void
  /** visible control popup display and hide */
  /** current deferred */
  deferred?: Deferred<any>
}
