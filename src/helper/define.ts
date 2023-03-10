import type { Component, RenderFunction, SetupContext } from 'vue'
import { defineComponent, h } from 'vue'

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
    name: options.name || `${component.name || ''}OverlayProvider`,
    setup: options.setup,
    render: options.render === false
      ? undefined
      : (options.render || defaultRender),
  })
  return Provider
}
