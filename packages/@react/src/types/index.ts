export type PropsWidthOverlays<P = unknown> = P & {
  visible?: boolean
  onReject?: (value: any) => void
  onResolve?: (value: any) => void
}
