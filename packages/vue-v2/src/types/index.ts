import type { GlobalMountOptions } from '@unoverlays/utils'
import type { Vue } from 'vue/types/vue'

export interface MountOptions extends GlobalMountOptions {
  /** current app context */
  parent?: Vue
}
