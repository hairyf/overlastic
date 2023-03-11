export interface MountOptions {
  /**
   * mount container element id
   *
   * @default 'unified-overlay-provider'
   */
  id?: string
  /**
   * enable mount container element id auto increment
   *
   * @default true
   */
  autoIncrement?: boolean
  /**
   * the dom node to mount at render time
   *
   * @default document.body
   */
  root?: HTMLElement | false
}
