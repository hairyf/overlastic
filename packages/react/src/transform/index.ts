import type { ImperativePromise } from '@unoverlays/utils'
import { createImperativePromiser, noop } from '@unoverlays/utils'
import type { FC } from 'react'
import { renderReactDOM } from '../helper/render'
import { useVisibleScripts } from '../hooks/visible'
import type { MountOptions } from '../types'

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
export function createOverlay<Props, Resolved = void>(component: FC): ImperativeOverlay<Props, Resolved> {
  function executor(props: any, promiser: any, options?: any) {
    const caches = { vanish: noop }
    function setup() {
      const scripts = useVisibleScripts(Object.assign(caches, { promiser }))
      return scripts
    }
    caches.vanish = renderReactDOM(component, props, { ...options, setup }).vanish
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
  component: FC,
  options: RenderOptions<Props> = {},
) {
  return createOverlay<Props, Resolved>(component)(options.props, options)
}
