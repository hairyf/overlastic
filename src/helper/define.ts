import type { Component, RenderFunction, SetupContext } from 'vue'
import { defineComponent, h } from 'vue'

export interface ComponentOptions {
  name?: string
  props?: any
  setup?: (props: any, context: SetupContext) => RenderFunction | void | any
  render?: Function
}
export function defineProviderComp(component: Component, options: ComponentOptions) {
  function defaultRender() {
    return h(component, options.props)
  }
  const Provider = defineComponent({
    name: options.name,
    setup: options.setup,
    render: options.render || defaultRender,
  })
  return Provider
}
