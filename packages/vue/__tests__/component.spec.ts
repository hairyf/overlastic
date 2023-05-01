/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { FieldRender } from '../src/components'
describe('@overlays/vue:component', () => {
  it('component:FieldRender:text', () => {
    const Text = defineComponent({
      render() {
        return h(FieldRender, { value: 'test:text' })
      },
    })
    const wrapper = mount(Text)

    expect(wrapper.text()).toBe('test:text')

    wrapper.unmount()
  })

  it('component:FieldRender:vnode', () => {
    const Text = defineComponent({
      render() {
        return h(FieldRender, { value: h('div', 'test:vnode') })
      },
    })
    const wrapper = mount(Text)

    expect(wrapper.text()).toBe('test:vnode')

    wrapper.unmount()
  })

  it('component:FieldRender:component', () => {
    const Component = defineComponent({
      render() {
        return h(FieldRender, { value: defineComponent({ render: () => 'test:component' }) })
      },
    })
    const wrapper = mount(Component)

    expect(wrapper.text()).toBe('test:component')

    wrapper.unmount()
  })
})
