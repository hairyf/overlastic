import { createPromiser } from '@overlays/core'
import { mount } from '@vue/test-utils'
import Overlay from './components/overlay.vue'

describe('@overlays/vue:declarative', () => {
  it('mount', () => {
    const wrapper = mount(Overlay, {
      props: { visible: false },
    })
    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    wrapper.unmount()
  })

  it('update:visible', async () => {
    const wrapper = mount(Overlay, {
      props: { visible: false },
    })

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    await wrapper.setProps({ visible: true })

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeTruthy()

    await wrapper.setProps({ visible: false })

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    wrapper.unmount()
  })

  it('emit:resolve', async () => {
    const promiser = createPromiser<string>()

    const wrapper = mount(Overlay, {
      props: {
        visible: true,
        onResolve: promiser.resolve,
      },
    })

    wrapper.get<HTMLDivElement>('.modal__confirm').element.click()

    expect(promiser).resolves.toBe('resolve')

    wrapper.unmount()
  })

  it('emit:reject', async () => {
    const promiser = createPromiser<string>()
    const wrapper = mount(Overlay, {
      props: {
        visible: true,
        onReject: promiser.reject,
      },
    })
    wrapper.get<HTMLDivElement>('.modal__cancel').element.click()

    expect(promiser).rejects.toThrow('reject')

    wrapper.unmount()
  })
})
