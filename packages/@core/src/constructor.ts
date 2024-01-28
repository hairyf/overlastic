import { defineGlobalElement, defineName, getIndex } from './define'
import type { Deferred } from './deferred'
import { createDeferred } from './deferred'

import { watchClickPosition } from './events'
import type { ClickPosition, ImperativeOverlay, MountOptions } from './types'
import { context } from './internal'

export type MountConstructorOptions<Options> = Options & {
  /**
   * The ID of the mounted element
   */
  id: string
  /**
   * The current element level defaults to 0 if autoIncrement is not started
   */
  index: number
  /**
   * mount elements, do not mount when root is false
   */
  container: HTMLDivElement
  /**
   * Promise, used to mark the completion and end of an instance
   */
  deferred: Deferred
  /**
   * Mouse position during triggering
   */
  position?: ClickPosition
}

export interface MountConstructor<Instance, Options> {
  (instance: Instance, props: any, options: MountConstructorOptions<Options>): void
}

export interface OverlaysConstructor<Instance, Options> {
  define: <Props, Resolved = void>(instance: Instance, options?: MountOptions<Options>) => ImperativeOverlay<Props, Resolved, Options>
  render: <Props, Resolved = void>(instance: Instance, props?: Props, options?: MountOptions<Options>) => Promise<Resolved>
}

/**
 * Create a overlays constructor
 * @param mount Trigger Mount
 * @example
 * const constructor = createConstructor<HTMLDivElement, { class: any }>((inst, props, options) => {
 *  const { deferred, container } = options
 *  inst.querySelector('button.confirm').onclick = function () {
 *    deferred.resolve('ok')
 *    container.remove()
 *  }
 *  inst.querySelector('button.close').onclick = function () {
 *    deferred.reject('close')
 *    container.remove()
 *  }
 *  inst.dataset['props'] = JSON.stringify(props)
 *  container.append(inst)
 * })
 */

export function createConstructor<Inst, Opts = {}>(mount: MountConstructor<Inst, Opts>): OverlaysConstructor<Inst, Opts> {
  function define(instance: Inst, options?: any) {
    function executor(props: any, options?: any) {
      const deferred = createDeferred()
      const name = defineName(options.id, options.autoIncrement)
      const index = getIndex(options.id)
      const container = defineGlobalElement(name, options.root)
      mount(instance, props, Object.assign(options, {
        position: context.position,
        id: name,
        deferred,
        index,
        container,
      }))
      return deferred as Deferred<any>
    }
    let inst: Deferred<any> | undefined
    function only(props: any, options?: any) {
      if (!inst) {
        inst = executor(props, options)
        inst.finally(() => inst = undefined)
      }
      return inst
    }

    function caller(props: any, overrides?: any) {
      const opts = { ...options, ...overrides }
      return opts.only
        ? only(props, opts)
        : executor(props, opts)
    }
    return caller
  }

  function render(instance: Inst, props?: any, options?: any) {
    return define(instance, options)(props)
  }
  return { define, render }
}

watchClickPosition()
