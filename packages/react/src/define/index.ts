import type { ImperativePromise } from '@unoverlays/utils'
import { createImperativePromiser, noop } from '@unoverlays/utils'
import type { FC } from 'react'
import { renderReactDOM } from '../helper'
import { useVisibleScripts } from '../hooks/visible'
import type { MountOptions } from '../types'

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
export function defineOverlay<Props, Resolved = void>(component: FC, options?: MountOptions): ImperativeOverlay<Props, Resolved> {
  function executor(props: any, opts?: any) {
    const promiser = createImperativePromiser()
    const context = { vanish: noop, promiser, isJax: false }
    function setup() {
      return useVisibleScripts(context)
    }
    context.vanish = renderReactDOM(component, props, { ...opts, setup }).vanish
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
export function renderOverlay<Props = {}, Resolved = void>(
  component: FC,
  options: RenderOptions<Props> = {},
) {
  return defineOverlay<Props, Resolved>(component)(options.props, options)
}
