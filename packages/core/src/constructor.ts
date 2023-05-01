import { defineGlobalNode } from './global'
import type { ImperativePromise, ImperativePromiser } from './promiser'
import { createImperativePromiser } from './promiser'
import type { GlobalMountOptions } from './types'
import { varIndex, varName } from './utils'

export type MountConstructorOptions<Opts> = Opts & {
  id: string
  index: number
  container: HTMLDivElement
  promiser: ImperativePromiser
}

export type MountOptions<Opts = {}> = GlobalMountOptions & Opts

export interface MountConstructor<Instance, Opts> {
  (instance: Instance, props: any, options: MountConstructorOptions<Opts>): void
}

export interface ImperativeOverlay<Props, Resolved, Opts = {}> {
  (props?: Props, options?: MountOptions<Opts>): ImperativePromise<Resolved>
}

export interface OverlaysConstructor<Instance, Opts> {
  define: <Props, Resolved = void>(instance: Instance, options?: MountOptions<Opts>) => ImperativeOverlay<Props, Resolved, Opts>
  render: <Props, Resolved = void>(instance: Instance, props?: Props, options?: MountOptions<Opts>) => Promise<Resolved>
}

export function createOverlaysConstructor<Inst, Opts = {}>(mount: MountConstructor<Inst, Opts>): OverlaysConstructor<Inst, Opts> {
  function define(instance: Inst, options?: any) {
    function executor(props: any, options?: any) {
      const promiser = createImperativePromiser()
      const id = varName(options.id, options.autoIncrement)
      const index = varIndex(options.id)
      const container = defineGlobalNode(id, options.root || document.body)
      mount(instance, props, Object.assign(options, {
        id,
        promiser,
        index,
        container,
      }))
      return promiser.promise as ImperativePromise<any>
    }
    let inst: ImperativePromise<any> | undefined
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
