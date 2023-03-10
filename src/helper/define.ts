import type { Component, RenderFunction, SetupContext } from 'vue-demi'
import { defineComponent, h } from 'vue-demi'

export interface ComponentOptions {
  name?: string
  props?: any
  setup?: (props: any, context: SetupContext) => RenderFunction | void | any
  render?: Function | false
}
export function defineProviderComponent(component: Component, options: ComponentOptions) {
  function defaultRender() {
    return h(component, options.props)
  }
  const Provider = defineComponent({
    name: options.name,
    setup: options.setup,
    render: options.render === false
      ? undefined
      : (options.render || defaultRender),
  })
  return Provider
}
