import type { Component, ExtractPropTypes } from 'vue-demi'
import { provide } from 'vue-demi'

import { renderInstance } from '../helper/render'
import type { MountOptions } from '../helper/interface'
import { OverlayMetaKey } from '../internal'
import { allowed, createPromiser } from '../utils'
import { useVisible } from '../hooks'

export interface ImperativePromise<T = any> extends Promise<T> {
  cancel: Function
  confirm: Function
}

export interface ImperativeOverlay<Props, Resolved> {
  (props?: ExtractPropTypes<Props>, options?: MountOptions): ImperativePromise<Resolved>
}

export interface RenderOptions<Props = unknown> extends MountOptions {
  props?: ExtractPropTypes<Props>
}

/**
 * Create imperative overlay
 * @param component Component
 */
export function createOverlay<Props, Resolved = void>(component: Component): ImperativeOverlay<Props, Resolved> {
  function executor(props: any, promiser: any, options?: any) {
    let vanish: Function
    function setup() {
      provide(OverlayMetaKey, useVisible(promiser, vanish))
    }
    ({ vanish } = renderInstance(component, props, { ...options, setup }))
  }

  function caller(props: any, options?: any) {
    const promiser = createPromiser<ImperativePromise>()
    promiser.promise.confirm = allowed
    promiser.promise.cancel = allowed
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
export function renderOverlay<Props = {}, Resolved = void>(
  component: Component,
  options: RenderOptions<Props> = {},
) {
  return createOverlay<Props, Resolved>(component)(options.props, options)
}
