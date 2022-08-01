import type { AppContext } from 'vue-demi'

export interface MountOverlayOptions {
  /** 渲染时挂在的 dom 节点 */
  root?: HTMLElement
  /** 用于继承当前应用上下文 */
  appContext?: AppContext
}
