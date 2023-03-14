import type { Component } from 'vue'

import type { ImperativePromise } from '@unoverlays/utils'
import { createImperativePromiser, noop } from '@unoverlays/utils'
import { renderChildApp } from '../helper/render'
import type { MountOptions } from '../types'
import { OverlayMetaKey } from '../internal'
import { createVisibleScripts } from '../provide'

export interface ImperativeOverlay<Props, Resolved> {
  (props?: Props, options?: MountOptions): ImperativePromise<Resolved>
}

export interface RenderOptions<Props> extends MountOptions {
  props?: Props
}

/**
 * Create imperative overlay
 * @param component Component
 */
export function createOverlay<Props, Resolved = void>(component: Component): ImperativeOverlay<Props, Resolved> {
  function executor(props: any, promiser: any, options?: any) {
    const caches = { vanish: noop }
    function provide() {
      return { [OverlayMetaKey]: createVisibleScripts(Object.assign(caches, { promiser })) }
    }
    caches.vanish = renderChildApp(component, props, { ...options, provide }).vanish
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
export function renderOverlay<Props = unknown, Resolved = void>(
  component: Component,
  options: RenderOptions<Props> = {},
) {
  return createOverlay<Props, Resolved>(component)(options.props, options)
}
