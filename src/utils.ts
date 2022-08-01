import type { Component } from 'vue'
import type { MountOverlayOptions } from './helper/interface'

import { createOverlay } from './transform'

export interface ExecuteOverlayOptions<P = any> extends MountOverlayOptions {
  props?: P
}

/**
 * 调起 overlay 组件
 * @param component 组件
 * @param props 参数
 * @param options imperativeOverlay 的配置
 * @returns
 */
export function executeOverlay<P = any, R = any>(component: Component, options?: ExecuteOverlayOptions<P>) {
  return createOverlay<P, R>(component)(options?.props as any, options)
}

export const noop: Function = () => {}
