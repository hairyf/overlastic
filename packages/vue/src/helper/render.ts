/* eslint-disable vue/one-component-per-file */

import type { Component } from 'vue-demi'
import { createApp, createVNode, defineComponent, h, render } from 'vue-demi'

import { pascalCase } from 'pascal-case'
import { defineGlobalNode, varName } from '@unoverlays/utils'
import type { MountOptions } from '../types'
import { context } from './internal'

export interface RenderChildOptions extends MountOptions {
  setup?: () => any
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

  const Provider: any = defineComponent({
    name: pascalCase(name),
    setup: options.setup,
    render: () => h(component, props),
  })

  const vnode = createVNode(Provider)
  const container = defineGlobalNode(name, options.root || document.body)

  vnode.appContext = options.appContext || context.appContext

  render(vnode, container)

  return { vanish, instance: vnode }
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
    Object.assign(app._context, parent._context)
  }

  const container = defineGlobalNode(name, options.root || document.body)

  app.mount(container)

  return vanish
}
