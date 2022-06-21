import type { Component } from 'vue'
import type { MountOverlayOptions } from './helper/interface'

import { transformOverlay } from './transform'

export interface UseOverlayCallOptions<P = any> extends MountOverlayOptions {
  props?: P
}

/**
 * 调起 overlay 组件
 * @param component 组件
 * @param props 参数
 * @param options imperativeOverlay 的配置
 * @returns
 */
export function useOverlayCall<P = any, R = any>(component: Component, options?: UseOverlayCallOptions<P>) {
  return transformOverlay<P, R>(component)(options?.props as any, options)
}

