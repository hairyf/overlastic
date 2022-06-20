import { AppContext, Component } from 'vue'

import { transformOverlay } from './transform'
/**
 * 调起 overlay 组件
 * @param component 组件
 * @param props 参数
 * @param options imperativeOverlay 的配置
 * @returns
 */
export function useOverlayCall<P = any, R = any>(component: Component, options?: {
  props?: P,
  appContext?: AppContext
}) {
  return transformOverlay<P, R>(component, options?.appContext)(options?.props as any)
}

