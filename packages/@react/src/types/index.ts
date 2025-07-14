export type PropsWithOverlays<P = unknown, V = void> = P & {
  visible?: boolean
  onCancel?: (value: any) => void
  onConfirm?: (value: V) => void
}
