/* eslint-disable vue/one-component-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { App, AppContext, Component, VNode } from 'vue-demi'
import { createApp, createVNode, defineComponent, h, render } from 'vue-demi'

import { context } from '../internal'
import { createGlobalNode } from '../utils'
import type { MountOptions } from './interface'

export interface RenderInstanceOptions extends MountOptions {
  setup?: () => void
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

  const name = `${component.name}OverlayProvider`

  const Provider = defineComponent({
    name,
    setup() {
      options.setup?.()
    },
    render() {
      return h(component as any, props)
    },
  })

  const container = createGlobalNode(name)

  const vnode = createVNode(Provider)
  vnode.appContext = options.appContext || context.appContext

  render(vnode, container)

  // append document.body
  if (container.firstElementChild) {
    const root = options.root || document.body
    root.append(container.firstElementChild)
  }

  return { vanish, vnode }
}

export function createChildApp(
  component: Component,
  props?: Record<string, any>,
  options: RenderInstanceOptions = {}) {
  const id = `${component.name || ''}OverlayProvider`

  const vanish = () => {
    app.unmount()
    container.remove()
  }

  const Provider = defineComponent({
    name: id,
    setup() {
      options.setup?.()
    },
    render() {
      return h(component as any, props)
    },
  })

  const app = createApp(Provider)

  const parent = options.appContext?.app || context.appContext?.app
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties
    const { reload, ...appContext } = parent._context as any
    Object.assign(app._context, appContext)
  }

  const container = createGlobalNode(id, options.root)

  app.mount(container)

  return { vanish, app }
}
