import { createConstructor } from '@overlays/core'
import { pascalCase } from 'pascal-case'
import type { AppContext, Component } from 'vue'
import { createApp, defineComponent, h, provide } from 'vue'

import { OverlayMetaKey } from '../internal'
import { useVisibleScripts } from '../composable'
import { inheritParent } from '../utils'

export interface VMountOptions {
  /** current app context */
  appContext?: AppContext
}

export const constructor = createConstructor<Component, VMountOptions>((Inst, props, options) => {
  const { container, id, promiser, appContext } = options

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

  inheritParent(app, appContext)

  app.mount(container)

  return vanish
})
