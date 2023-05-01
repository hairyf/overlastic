export type PropsWidthOverlays<P = unknown> = P & {
  visible?: boolean
  onReject?: Function
  onResolve?: Function
  [key: string]: any
}
