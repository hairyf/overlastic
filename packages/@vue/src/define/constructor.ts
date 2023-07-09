import { createConstructor } from '@overlays/core'
import { pascalCase } from 'pascal-case'
import type { AppContext, Component } from 'vue-demi'
import { createApp, defineComponent, h, provide } from 'vue-demi'

import { OverlayMetaKey, context, OptionsWapper } from '../internal'
import { useVisibleScripts } from '../composable'
import { inheritParent } from '../utils'

export interface VMountOptions {
  /** current app context */
  appContext?: AppContext,
  /** wapper component */
  wapper?: OptionsWapper
}

export const constructor = createConstructor<Component, VMountOptions>((Inst, props, options) => {
  const { container, id, deferred, appContext } = options

  function vanish() {
    app.unmount()
    container.remove()
  }

  const wapper = options?.wapper ?? context.options?.wapper
  const hInst = h(Inst, props)
  const wapperInst = wapper ? h(wapper, null, hInst) : hInst
  const ChildApp = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = useVisibleScripts({
        vanish,
        deferred,
      })
      provide(OverlayMetaKey, scripts)
    },
    render: () => wapperInst,
  })

  const app = createApp(ChildApp)

  inheritParent(app, appContext)

  app.mount(container)

  return vanish
})
