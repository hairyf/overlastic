import type { Component } from 'vue'
import Vue from 'vue'
import { pascalCase } from 'pascal-case'
import { defineGlobalNode, varName } from '@unoverlays/utils'
import type { MountOptions } from '../types'
import { context } from '../internal'

export function renderChildApp(
  component: Component,
  props: Record<string, any> = {},
  options: MountOptions = {},
) {
  const name = varName(options.id, options.autoIncrement)

  function vanish() {
    app.$destroy()
    container.remove()
  }

  const app = new Vue({
    name: pascalCase(name),
    parent: options.parent || context.parent,
    provide: options.provide,
    render: h => h(component, { props }),
  })

  const container = defineGlobalNode(name, options.root || document.body)

  app.$mount(container)

  return { vanish, instance: app }
}
