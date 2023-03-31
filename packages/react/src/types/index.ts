import type { GlobalMountOptions } from '@unoverlays/utils'

export interface MountOptions extends GlobalMountOptions {

}

export type PropsWidthOverlays<P = unknown> = P & {
  visible?: boolean
  onCancel?: Function
  onConfirm?: Function
  [key: string]: any
}
