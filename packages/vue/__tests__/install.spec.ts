import { UnifiedOverlayProvider, install } from '@unoverlays/vue'
import { context } from '@unoverlays/vue/src/helper'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Basic from './components/basic.vue'
describe('@unoverlays/vue:install', () => {
  it('install:provider', () => {
    const wrapper = mount(UnifiedOverlayProvider)

    expect(context.appContext).not.toBeUndefined()

    context.appContext = null
    wrapper.unmount()
  })
  it('install:provider:content', () => {
    const Main = defineComponent({
      render() {
        return h(UnifiedOverlayProvider, {}, {
          default: () => 'content',
        })
      },
    })
    const wrapper = mount(Main)
    expect(wrapper.text()).toBe('content')

    wrapper.unmount()
  })

  it('install:function', () => {
    const wrapper = mount(Basic, {
      global: { plugins: [install] },
    })

    expect(context.appContext).not.toBeUndefined()

    context.appContext = null
    wrapper.unmount()
  })
})
