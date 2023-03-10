import type { Component, ExtractPropTypes } from 'vue-demi'
import { provide, ref } from 'vue-demi'

import { renderVNode } from '../helper'
import type { MountOptions } from '../helper'
import { OverlayMetaKey } from '../internal'
import type { ImperativePromise } from '../utils'
import { createImperativePromiser } from '../utils'
import { useVisibleScripts } from '../hooks'

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
      const visible = ref(false)
      const scripts = useVisibleScripts(visible, { promiser, vanish })
      provide(OverlayMetaKey, scripts)
    }
    ({ vanish } = renderVNode(component, props, { ...options, setup }))
  }

  function caller(props: any, options?: any) {
    const promiser = createImperativePromiser()
    executor(props, promiser, options)
    return promiser.promise as ImperativePromise<Resolved>
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
