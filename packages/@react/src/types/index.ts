export type PropsWithOverlays<P = unknown, V = void> = P & {
  visible?: boolean
  onCancel?: (value: any) => void
  onConfrim?: (value: V) => void
}
