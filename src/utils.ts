import { Component } from 'vue'

import { transformImperativeOverlay, ImperativeOverlay } from './transform'
/**
 * 调起 overlay 组件
 * @param component 组件
 * @param props 参数
 * @param options imperativeOverlay 的配置
 * @returns
 */
export function useImperativeOverlay<P = any, R = any>(component: Component, props: P) {
  return transformImperativeOverlay<P, R>(component)(props as any)
}

/**
 * 创建持有者, 使弹出层支持继承上下文注入
 * @param imperativeOverlay
 * @todo 未实现
 */
export const useInjectionHolder = (imperativeOverlay: ImperativeOverlay<any, any>) => imperativeOverlay
