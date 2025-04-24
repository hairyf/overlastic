import type { Component } from 'vue'
import type { AbstractFn } from '../types'
import { createConstructor } from '@overlastic/core'

import { pascalCase } from 'pascal-case'
import { defineComponent, h, inject, provide } from 'vue'
import { InstancesInjectionKey, ScriptsInjectionKey } from '../internal'
import { createScripts } from './scripts'

interface Options {
  render: (instance: Component, props: any) => void
  vanish: (instance: Component) => void
}

const { define } = createConstructor<Component, Options>((Instance, props, options) => {
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

export function useOverlayInject<Component extends AbstractFn, Resolved>(Instance: Component) {
  const { render, vanish } = inject(InstancesInjectionKey)!
  return define<InstanceType<Component>['$props'], Resolved>(Instance as any, { render, vanish })
}
