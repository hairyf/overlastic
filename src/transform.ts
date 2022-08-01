import type { Component, ExtractPropTypes } from 'vue-demi'
import { provide, ref } from 'vue-demi'

import { renderInstance } from './helper/render'
import type { MountOverlayOptions } from './helper/interface'
import { OverlayMetaKey } from './internal'

export type ImperativePromise<T = any> = Promise<T> & { cancel: Function; confirm: Function }

export type ExtractInferTypes<Props> = Props extends ExtractPropTypes<infer E> ? E : ExtractPropTypes<Props>
export type ImperativeOverlay<Params, Resolved> = (props?: ExtractInferTypes<Params>, options?: MountOverlayOptions) => ImperativePromise<Resolved>

export interface ExePromiserOptions {
  resolve: Function
  reject: Function
  promise: ImperativePromise<any>
}

/**
 * Create imperative overlay
 * @param component Component
 */
export function createOverlay<Params = any, Resolved = void>(
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

export function createPromiser<P = Promise<any>>() {
  let resolve!: Function
  let reject!: Function
  const promise = new Promise<any>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as P
  return { promise, reject, resolve }
}
