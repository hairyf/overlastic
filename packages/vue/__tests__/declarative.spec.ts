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
    const { promise, resolve } = createPromiser<string>()

    const wrapper = mount(Overlay, {
      props: {
        visible: true,
        onResolve: resolve,
      },
    })

    wrapper.get<HTMLDivElement>('.modal__confirm').element.click()

    expect(promise).resolves.toBe('resolve')

    wrapper.unmount()
  })

  it('emit:reject', async () => {
    const { promise, reject } = createPromiser<string>()
    const wrapper = mount(Overlay, {
      props: {
        visible: true,
        onReject: reject,
      },
    })
    wrapper.get<HTMLDivElement>('.modal__cancel').element.click()

    expect(promise).rejects.toThrow('reject')

    wrapper.unmount()
  })
})
