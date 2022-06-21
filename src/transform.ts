import type { Component, ExtractPropTypes } from 'vue'
import { provide, ref } from 'vue'

import { renderInstance } from './helper/render'
import type { MountOverlayOptions } from './helper/interface'
import { OverlayMetaKey } from './internal'

export type ExtractInferTypes<Props> = Props extends ExtractPropTypes<infer E> ? E : ExtractPropTypes<Props>
export type ImperativeOverlay<Params, Resolved> = (props?: ExtractInferTypes<Params>, options?: MountOverlayOptions) => Promise<Resolved>

/**
 * 转换命令式弹出层 Api
 * @param component 组件
 * @param options 弹出层配置
 * @returns 命令式弹出层
 */
export function transformOverlay<Params = any, Resolved = void>(
  component: Component,
): ImperativeOverlay<Params, Resolved> {
  const executor = (props: any, resolve: Function, reject: Function, options?: MountOverlayOptions) => {
    renderInstance(component, props, {
      appContext: options?.appContext,
      root: options?.root,
      setup: (vnode, _vanish) => {
        const visible = ref(false)
        function cancel(value: any) {
          reject?.(value)
          visible.value = false
        }
        function confirm(value: any) {
          resolve?.(value)
          visible.value = false
        }
        function vanish() {
          _vanish?.()
          reject?.()
        }
        provide(OverlayMetaKey, {
          cancel,
          confirm,
          vanish,
          visible,
          vnode,
        })
      },
    })
  }
  const caller = (props: any, options?: any) =>
    new Promise<any>((resolve, reject) => {
      executor(props, resolve, reject, options)
    })
  return caller
}
