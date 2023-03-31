import type { Component } from 'vue'
import Vue from 'vue'
import { pascalCase } from 'pascal-case'
import { defineGlobalNode, varName } from '@unoverlays/utils'
import type { MountOptions } from '../types'

export interface RenderChildOptions extends MountOptions {
  provide?: () => void
}

export function renderChildApp(
  component: Component,
  props: Record<string, any> = {},
  options: RenderChildOptions = {},
) {
  const name = varName(options.id, options.autoIncrement)

  function vanish() {
    app.$destroy()
    container.remove()
  }

  const app = new Vue({
    name: pascalCase(name),
    parent: options.parent,
    provide: options.provide,
    render: h => h(component, { props }),
  })

  const container = defineGlobalNode(name, options.root || document.body)
  const child = document.createElement('div')
  container.appendChild(child)
  app.$mount(child)

  return { vanish, instance: app }
}
