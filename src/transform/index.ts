import type { Component, ExtractPropTypes } from 'vue-demi'
import { provide, ref } from 'vue-demi'

import { renderInstance } from '../helper/render'
import type { MountOverlayOptions } from '../helper/interface'
import { OverlayMetaKey } from '../internal'
import { createPromiser } from '../utils'

export type ImperativePromise<T = any> = Promise<T> & { cancel: Function; confirm: Function }

export type ImperativeOverlay<Params, Resolved> = (props?: ExtractPropTypes<Params>, options?: MountOverlayOptions) => ImperativePromise<Resolved>

export interface ExePromiserOptions {
  resolve: Function
  reject: Function
  promise: ImperativePromise<any>
}

export interface ExecuteOverlayOptions<P = any> extends MountOverlayOptions {
  props?: P
}

/**
 * Create imperative overlay
 * @param component Component
 */
export function createOverlay<Params, Resolved = void>(
  component: Component,
): ImperativeOverlay<Params, Resolved> {
  const executor = (props: any, promiser: ExePromiserOptions, mountOptions?: MountOverlayOptions) => {
    const { reject, resolve, promise } = promiser
    renderInstance(component, props, {
      appContext: mountOptions?.appContext,
      root: mountOptions?.root,
      provide: (vnode, _vanish) => {
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

        promise.confirm = confirm
        promise.cancel = cancel

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
  const caller = (props: any, options?: any) => {
    const promiser = createPromiser<ImperativePromise>()
    const notAllowedError = function () {
      throw new Error('overlay - Error: It is not allowed to call confirm and cancel externally immediately, please wait for the component to render')
    }
    promiser.promise.confirm = notAllowedError
    promiser.promise.cancel = notAllowedError
    executor(props, promiser, options)
    return promiser.promise
  }
  return caller
}

/**
 * Execute overlay component
 * @param component Component
 * @param options mount options and props
 */
export function executeOverlay<P = any, R = any>(component: Component, options?: ExecuteOverlayOptions<P>) {
  return createOverlay<P, R>(component)(options?.props as any, options)
}
