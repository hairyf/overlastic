import type { AppContext } from 'vue-demi'
import type { MountOptions as _MountOptions } from '../../types'

export interface MountOptions extends _MountOptions {
  /** current app context */
  appContext?: AppContext
}
