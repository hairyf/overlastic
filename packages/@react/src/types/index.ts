export type PropsWithOverlays<P = unknown> = P & {
  visible?: boolean
  onReject?: (value: any) => void
  onResolve?: (value: any) => void
}
