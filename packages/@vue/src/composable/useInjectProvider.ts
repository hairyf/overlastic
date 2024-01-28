import { createConstructor } from '@overlays/core'
import { defineComponent, h, inject, provide } from 'vue'
import type { Component, DefineComponent } from 'vue'

import { pascalCase } from 'pascal-case'
import { InstancesInjectionKey, ScriptsInjectionKey } from '../internal'
import { useScripts } from './useScripts'

interface Options {
  render: (instance: Component, props: any) => void
  vanish: (instance: Component) => void
}

const { define } = createConstructor<Component, Options>((Instance, props, options) => {
  const { container, id, deferred, render, vanish: _vanish } = options

  const InstanceWithProvider = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = useScripts({ vanish, deferred })
      provide(ScriptsInjectionKey, scripts)
    },
    render: () => h(Instance, props),
  })

  function vanish() {
    _vanish(InstanceWithProvider)
    container.remove()
  }

  render(Instance, props)
})

export function useInjectProvider<Props, Resolved>(Instance: DefineComponent<Props>) {
  const { render, vanish } = inject(InstancesInjectionKey)!
  return define<Props, Resolved>(Instance, { render, vanish })
}
