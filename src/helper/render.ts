/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Component } from 'vue-demi'
import { createApp, createVNode, defineComponent, h, render } from 'vue-demi'

import { context } from '../internal'
import { createGlobalNode } from '../utils'
import { defineProviderComponent } from './define'
import type { MountOptions } from './interface'

export interface RenderVNodeOptions extends MountOptions {
  setup?: () => void
}

export function renderVNode(
  component: Component,
  props?: Record<string, any>,
  options: RenderVNodeOptions = {},
) {
  // There is no need to call document.body.removeChild(container.firstElementChild) here
  // Because calling render(null, container) does the work for us

  function vanish() {
    render(null, container)
  }

  const name = `${component.name}OverlayProvider`

  const Provider = defineProviderComponent(component, {
    setup: options.setup,
    props,
    name,
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

export function renderChildApp(
  component: Component,
  props?: Record<string, any>,
  options: RenderVNodeOptions = {}) {
  const id = `${component.name || ''}OverlayProvider`

  function vanish() {
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
