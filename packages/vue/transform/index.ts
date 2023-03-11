import type { Component, ExtractPropTypes } from 'vue-demi'
import { provide, ref } from 'vue-demi'

import type { ImperativePromise } from '@unified-overlays/utils'
import { createImperativePromiser, noop } from '@unified-overlays/utils'
import { renderChildApp } from '../helper'
import type { MountOptions } from '../helper'
import { OverlayMetaKey } from '../internal'

import { useVisibleScripts } from '../hooks'

export interface ImperativeOverlay<Props, Resolved> {
  (props?: ExtractPropTypes<Props>, options?: MountOptions): ImperativePromise<Resolved>
}

export interface RenderOptions<Props> extends MountOptions {
  props?: ExtractPropTypes<Props>
}

/**
 * Create imperative overlay
 * @param component Component
 */
export function createOverlay<Props, Resolved = void>(component: Component): ImperativeOverlay<Props, Resolved> {
  function executor(props: any, promiser: any, options?: any) {
    const caches = { vanish: noop }
    function setup() {
      const visible = ref(false)
      const scripts = useVisibleScripts(visible, Object.assign(caches, { promiser }))
      provide(OverlayMetaKey, scripts)
    }
    caches.vanish = renderChildApp(component, props, { ...options, setup }).vanish
  }

  function caller(props: any, options?: any) {
    const promiser = createImperativePromiser()
    executor(props, promiser, options)
    return promiser.promise as unknown as ImperativePromise<Resolved>
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
