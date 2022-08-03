import type { Component } from 'vue-demi'
import type { MountOverlayOptions } from './helper/interface'

import { createOverlay } from './transform'

export interface ExecuteOverlayOptions<P = any> extends MountOverlayOptions {
  props?: P
}

/**
 * Execute overlay component
 * @param component Component
 * @param options mount options and props
 */
export function executeOverlay<P = any, R = any>(component: Component, options?: ExecuteOverlayOptions<P>) {
  return createOverlay<P, R>(component)(options?.props as any, options)
}

export function delay(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const noop: Function = () => {}
