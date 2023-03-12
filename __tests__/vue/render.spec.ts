import { renderChildApp, renderVNode } from '@unoverlays/vue/src/helper'
import { install } from '@unoverlays/vue'
import { createApp } from 'vue'
import { isBasicExists } from '../utils'
import Basic from './components/basic.vue'
describe('@unoverlays/vue:render', () => {
  it('render:vnode', () => {
    const { vanish } = renderVNode(Basic, {})
    expect(isBasicExists()).toBeTruthy()

    vanish()

    expect(isBasicExists()).toBeFalsy()
  })

  it('render:child-app', () => {
    const { vanish } = renderChildApp(Basic)
    expect(isBasicExists()).toBeTruthy()

    vanish()

    expect(isBasicExists()).toBeFalsy()
  })

  it('render:child-app:parent', () => {
    const app = createApp(Basic)
    app.config.globalProperties['value-1'] = '--value-1--'
    app.config.globalProperties['value-2'] = '--value-2--'

    const { vanish, instance } = renderChildApp(Basic, undefined, {
      appContext: app._context,
    })

    expect(instance.config.globalProperties).toEqual(instance.config.globalProperties)

    app.config.globalProperties['value-3'] = '--value-3--'

    expect(instance.config.globalProperties).toEqual(instance.config.globalProperties)

    vanish()
  })

  it('render:child-app:parent:global', () => {
    const app = createApp(Basic)
    app.use(install)
    app.config.globalProperties['value-1'] = '--value-1--'
    app.config.globalProperties['value-2'] = '--value-2--'

    const { vanish, instance } = renderChildApp(Basic)

    expect(instance.config.globalProperties).toEqual(instance.config.globalProperties)

    app.config.globalProperties['value-3'] = '--value-3--'

    expect(instance.config.globalProperties).toEqual(instance.config.globalProperties)

    vanish()
  })
})
