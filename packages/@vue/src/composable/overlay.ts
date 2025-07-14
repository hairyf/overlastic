import type { GlobalMountOptions, ImperativeOverlay, MountOptions } from '@overlastic/core'
import type { Component } from 'vue'
import type { AbstractFn } from '../types'
import { createConstructor, defineName } from '@overlastic/core'
import { pascalCase } from 'pascal-case'
import { defineComponent, h, inject, provide, Teleport } from 'vue'
import { InstancesInjectionKey, ScriptsInjectionKey } from '../internal'
import { createRefreshMetadata, createScripts } from './utils'
import { VNodeProps } from 'vue'

export type InjectionHolder<Component extends AbstractFn, Resolved> = [Component, ImperativeOverlay<InstanceType<Component>['$props'], Resolved>]

export type InjectionOptions = {
  render: (instance: Component, props: any) => void
  vanish: (instance: Component) => void
}

export type ExtractEvent<T extends AbstractFn> = Parameters<Required<InstanceType<T>['$props']>['onConfirm']>[0]
export type ExtractProps<T extends AbstractFn> = Omit<InstanceType<T>['$props'], keyof VNodeProps>

const { define: defineInject } = createConstructor<Component, InjectionOptions>((Instance, props, options) => {
  const { id, deferred, render, vanish: _vanish } = options

  const InstanceWithProvider = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = createScripts({ vanish, deferred })
      provide(ScriptsInjectionKey, scripts)
    },
    render: () => h(Instance, props),
  })

  function vanish() {
    _vanish(InstanceWithProvider)
  }

  render(InstanceWithProvider, props)
}, { container: false })

export function defineHolder(component: Component, options: Omit<GlobalMountOptions, 'appContext'> = {}, ) {
  const { callback, scripts, props, refresh } = createRefreshMetadata()
  const name = defineName(options.id, options.autoIncrement)

  function render() {
    return h(
      Teleport,
      {
        to: options.root || document.body,
        disabled: options.root === false,
      },
      h('div', { id: name }, [
        h(component as any, props.value),
      ]),
    )
  }

  const Holder = defineComponent({
    name: pascalCase(name),
    setup() {
      provide(ScriptsInjectionKey, scripts)
      return () => refresh.value ? render() : null
    },
  })

  return [
    Holder as unknown as Component,
    callback
  ]
}

export function useOverlay<Comp extends AbstractFn, Resolved = ExtractEvent<Comp>>(Instance: Comp, options?: MountOptions<{ type?: 'inject' }>): ImperativeOverlay<ExtractProps<Comp>, Resolved>
export function useOverlay<Comp extends AbstractFn, Resolved = ExtractEvent<Comp>>(Instance: Comp, options?: MountOptions<{ type?: 'holder' }>): InjectionHolder<Comp, ImperativeOverlay<ExtractProps<Comp>, Resolved>>
export function useOverlay(Instance: any, options: MountOptions<{ type?: 'holder' | 'inject' }> = {}): any {
  const { type = 'inject' } = options ?? {}
  if (type === 'inject') {
    const { render, vanish } = inject(InstancesInjectionKey)!
    return defineInject(Instance, { render, vanish })
  }
  if (type === 'holder') {
    return defineHolder(Instance, options)
  }
}


