import type { Component } from 'vue'

import type { ImperativePromise } from '@unoverlays/utils'
import { createImperativePromiser, noop } from '@unoverlays/utils'
import { OverlayMetaKey, renderChildApp } from '../helper'
import type { MountOptions } from '../types'
import { createVisibleScripts } from '../hooks'

export interface ImperativeOverlay<Props, Resolved> {
  (props?: Props, options?: MountOptions): ImperativePromise<Resolved>
}

export interface RenderOptions<Props> extends Omit<MountOptions, 'only'> {
  props?: Props
}

/**
 * Create imperative overlay
 * @param component Component
 */
export function defineOverlay<Props, Resolved = void>(component: Component, options?: MountOptions): ImperativeOverlay<Props, Resolved> {
  function executor(props: any, opts?: any) {
    const promiser = createImperativePromiser()
    const context = { vanish: noop, promiser }
    function setup() {
      return { [OverlayMetaKey]: createVisibleScripts(context) }
    }
    context.vanish = renderChildApp(component, props, { ...opts, setup })
    return promiser.promise as unknown as ImperativePromise<Resolved>
  }

  let inst: ImperativePromise<Resolved> | undefined
  function only(props: any, opts?: MountOptions) {
    if (!inst) {
      inst = executor(props, opts)
      inst.finally(() => inst = undefined)
    }
    return inst
  }
  function caller(props: any, opts?: MountOptions) {
    opts = { ...options, ...opts }
    return opts.only ? only(props, opts) : executor(props, opts)
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
  return defineOverlay<Props, Resolved>(component)(options.props, options)
}
