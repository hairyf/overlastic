import { mount } from '@vue/test-utils'
import { install } from '../src'
import { context } from '../src/internal'
import Basic from './components/basic.vue'

describe('@overlastic/vue:install', () => {
  it('install:function', () => {
    const wrapper = mount(Basic, {
      global: { plugins: [install as any] },
    })

    expect(context.appContext).not.toBeUndefined()

    context.appContext = null
    wrapper.unmount()
  })
})
