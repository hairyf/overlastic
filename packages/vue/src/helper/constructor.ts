import { createOverlaysConstructor } from '@overlays/core'
import { pascalCase } from 'pascal-case'
import type { App, AppContext, Component } from 'vue'
import { createApp, defineComponent, h, provide } from 'vue'

import { OverlayMetaKey, context } from '../helper'
import { useVisibleScripts } from '../composable'

export interface VMountOptions {
  /** current app context */
  appContext?: AppContext
}

export const constructor = createOverlaysConstructor<Component, VMountOptions>((Inst, props, options) => {
  const { container, id, promiser } = options
  function vanish() {
    app.unmount()
    container.remove()
  }

  const ChildApp = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = useVisibleScripts({
        vanish,
        promiser,
      })
      provide(OverlayMetaKey, scripts)
    },
    render: () => h(Inst, props),
  })

  const app = createApp(ChildApp)

  extendsParent(app, options.appContext)

  app.mount(container)

  return vanish
})

function extendsParent(app: App<Element>, appContext?: AppContext) {
  const parent = appContext?.app || context.appContext?.app
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties
    Object.assign(app._context, parent._context)
  }
}
