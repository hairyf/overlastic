import { AppContext, Component, ExtractPropTypes, reactive, VNode } from 'vue'
import { defineComponent, h, provide, ref } from 'vue'
import { renderInstance } from './render'
import { OverlayMeta, OverlayMetaKey } from './meta'

export type ExtractInferTypes<Props> = Props extends ExtractPropTypes<infer E> ? E : ExtractPropTypes<Props>
export type ImperativeOverlay<Props, Result> = (props?: ExtractInferTypes<Props>) => Promise<Result>

/**
 * 转换命令式弹出层 Api
 * @param component 组件
 * @param options 弹出层配置
 * @returns 命令式弹出层
 */
export function transformOverlay<P = any, R = void>(component: Component, appContext?: AppContext): ImperativeOverlay<P, R> {
  const executor = (props: any, resolve: Function, reject: Function) => {
    renderInstance(component, props, {
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
          cancel, confirm,
          vanish, visible,
          vnode
        })
      },
      appContext,
    })
  }

  const caller = (props: any) =>
    new Promise<any>((resolve, reject) => {
      executor(props, resolve, reject)
    })

  return caller
}
