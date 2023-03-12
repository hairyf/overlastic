/* eslint-disable vue/one-component-per-file */
/* eslint-disable unused-imports/no-unused-vars */
import type { Component } from 'vue-demi'
import { createApp, createVNode, defineComponent, h, render } from 'vue-demi'

import { pascalCase } from 'pascal-case'
import { defineGlobalNode, varName } from '@unoverlays/utils'
import { context } from '../internal'
import type { MountOptions } from '../types'

export interface RenderChildOptions extends MountOptions {
  setup?: () => void
}

export function renderVNode(
  component: Component,
  props?: Record<string, any>,
  options: RenderChildOptions = {},
) {
  const name = varName(options.id, options.autoIncrement)

  // There is no need to call document.body.removeChild(container.firstElementChild) here
  // Because calling render(null, container) does the work for us
  function vanish() {
    render(null, container)
    container.remove()
  }

  const Provider = defineComponent({
    name: pascalCase(name),
    setup: options.setup,
    render: () => h(component, props),
  })

  const vnode = createVNode(Provider)
  const container = defineGlobalNode(name, options.root || document.body)

  vnode.appContext = options.appContext || context.appContext

  render(vnode, container)

  return { vanish }
}

export function renderChildApp(
  component: Component,
  props?: Record<string, any>,
  options: RenderChildOptions = {}) {
  const name = varName(options.id, options.autoIncrement)

  function vanish() {
    app.unmount()
    container.remove()
  }

  const Provider = defineComponent({
    name: pascalCase(name),
    setup: options.setup,
    render: () => h(component, props),
  })

  const app = createApp(Provider)

  const parent = options.appContext?.app || context.appContext?.app
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties
    const { reload, ...appContext } = parent._context as any
    Object.assign(app._context, appContext)
  }

  const container = defineGlobalNode(name, options.root || document.body)

  app.mount(container)

  return { vanish }
}
