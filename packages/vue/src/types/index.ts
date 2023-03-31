import type { GlobalMountOptions } from '@unoverlays/utils'
import type { AppContext } from 'vue-demi'

export interface MountOptions extends GlobalMountOptions {
  /** current app context */
  appContext?: AppContext
}
