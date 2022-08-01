import type { AppContext, InjectionKey, Ref, VNode } from 'vue-demi'

export const context = {
  appContext: null as null | AppContext,
}

export interface OverlayMeta {
  /** 调取失败，更改 visible，且当 animation 结束后销毁 */
  cancel: Function
  /** 调取成功，更改 visible，且当 animation 结束后销毁 */
  confirm: Function
  /** 销毁当前实例（立即，且调用失败），不是 overlay 则调用 reject */
  vanish: Function
  /** vnode 当前包装层的 VNode */
  vnode?: VNode
  /** visible 包装层属性，控制弹出层显示与隐藏 */
  visible: Ref<boolean>
  /** 使用默认的值(component 式调用) */
  isTemplate?: boolean
}

export const OverlayMetaKey: InjectionKey<OverlayMeta> = Symbol('__imperative_overlay_key')
