import { createConstructor } from '@overlays/core'
import { pascalCase } from 'pascal-case'

import type { Component } from 'vue'
import Vue from 'vue'
import { createVisibleScripts } from '../composable'

export interface VMountOptions {
  /** current app context */
  parent?: Vue
}

export const constructor = createConstructor<Component, VMountOptions>((Inst, props, options) => {
  const { container, id, deferred } = options
  function vanish() {
    childApp.$destroy()
    container.remove()
  }

  const $overlay = createVisibleScripts({
    deferred,
    vanish,
  })

  const childApp = new Vue({
    name: pascalCase(id),
    parent: options.parent,
    provide: () => ({ $overlay }),
    render: h => h(Inst, { props }),
  })

  const child = document.createElement('div')
  container.appendChild(child)
  childApp.$mount(child)
})
