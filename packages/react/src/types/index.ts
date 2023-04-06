import type { GlobalMountOptions } from '@unoverlays/utils'

export interface MountOptions extends GlobalMountOptions {

}

export type PropsWidthOverlays<P = unknown> = P & {
  visible?: boolean
  onReject?: Function
  onResolve?: Function
  [key: string]: any
}
