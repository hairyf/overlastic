import type { Deferred } from '../deferred'

export interface GlobalMountOptions {
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
  root?: HTMLElement | false | null

  /** only overlay */
  only?: boolean
}

export interface ImperativeOverlay<Props, Resolved, Opts = {}> {
  (props?: Props, options?: MountOptions<Opts>): Deferred<Resolved>
}

export type MountOptions<Opts = {}> = GlobalMountOptions & Opts

export interface ClickPosition {
  x: number
  y: number
}
