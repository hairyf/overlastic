import type { AppContext } from 'vue-demi'

export interface MountOptions {
  /** the dom node to mount at render time */
  root?: HTMLElement
  /** current app context */
  appContext?: AppContext
}
