/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { Field } from '../src/components'
describe('@overlastic/vue:component', () => {
  it('component:Field:text', () => {
    const Text = defineComponent({
      render() {
        return h(Field, { is: 'test:text' })
      },
    })
    const wrapper = mount(Text)

    expect(wrapper.text()).toBe('test:text')

    wrapper.unmount()
  })

  it('component:Field:vnode', () => {
    const Text = defineComponent({
      render() {
        return h(Field, { is: h('div', 'test:vnode') })
      },
    })
    const wrapper = mount(Text)

    expect(wrapper.text()).toBe('test:vnode')

    wrapper.unmount()
  })

  it('component:Field:component', () => {
    const Component = defineComponent({
      render() {
        return h(Field, { is: defineComponent({ render: () => 'test:component' }) })
      },
    })
    const wrapper = mount(Component)

    expect(wrapper.text()).toBe('test:component')

    wrapper.unmount()
  })
})
