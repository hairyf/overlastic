/* eslint-disable ts/no-use-before-define */
import type { AppContext, Component } from 'vue-demi'
import { createConstructor } from '@overlastic/core'
import { pascalCase } from 'pascal-case'
import { createApp, defineComponent, h, provide } from 'vue-demi'

import { createScripts } from '../composable'
import { ScriptsInjectionKey } from '../internal'
import { inheritParent } from '../utils'

export interface VMountOptions {
  /** current app context */
  appContext?: AppContext
}

export const constructor = createConstructor<Component, VMountOptions>((Instance, props, options) => {
  const { container, id, deferred, appContext } = options

  function vanish() {
    app.unmount()
    container.remove()
  }

  const InstanceWithProvider = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = createScripts({
        vanish,
        deferred,
      })
      provide(ScriptsInjectionKey, scripts)
    },
    render: () => h(Instance, props),
  })

  const app = createApp(InstanceWithProvider)

  inheritParent(app, appContext)

  app.mount(container)

  return vanish
})
