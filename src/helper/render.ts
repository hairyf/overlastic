import type { Component, VNode } from 'vue-demi'
import { createVNode, defineComponent, h, render } from 'vue-demi'
import { context } from '../internal'
import type { MountOverlayOptions } from './interface'

export interface RenderInstanceOptions extends MountOverlayOptions {
  provide?: (vnode: VNode, vanish: Function) => void
}

export const renderInstance = (
  component: Component,
  props?: Record<string, any>,
  options: RenderInstanceOptions = {},
) => {
  // There is no need to call document.body.removeChild(container.firstElementChild) here
  // Because calling render(null, container) does the work for us
  const vanish = () => {
    render(null, container)
  }

  const Provider = defineComponent({
    name: `${component.name}OverlayProvider`,
    setup() {
      options.provide?.(vnode, vanish)
    },
    render() {
      return h(component as any, props)
    },
  })

  const container = document.createElement('div')
  container.className = 'overlay-container'
  const vnode = createVNode(Provider, props)

  vnode.appContext = options.appContext || context.appContext

  render(vnode, container)

  // append document.body
  if (container.firstElementChild) {
    const root = options.root || document.body
    root.append(container.firstElementChild)
  }

  return { vanish, vnode }
}
