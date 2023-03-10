export interface OverlayMetaOptions {
  /** animation duration to avoid premature destruction of components */
  animation?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
  /**
   * v-model fields used by template
   *
   * @default 'visible'
   */
  model?: string
  /**
   * cancel event name used by the template
   *
   * @default 'cancel'
   */
  cancel?: string
  /**
   * confirm event name used by the template
   *
   * @default 'confirm'
   */
  confirm?: string
  /**
   * whether to automatically handle components based on visible and animation
   *
   * @default true
   */
  automatic?: boolean
}

