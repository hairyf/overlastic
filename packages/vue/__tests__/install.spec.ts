import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { UnifiedOverlayProvider, install } from '../src'
import { context } from '../src/internal'
import Basic from './components/basic.vue'

describe('@overlays/vue:install', () => {
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
