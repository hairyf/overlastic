import { createDeferred } from '@overlastic/core'
import { mount } from '@vue/test-utils'
import Overlay from './components/overlay.vue'

describe('@overlastic/vue:declarative', () => {
  it('mount', () => {
    const wrapper = mount(Overlay, {
      props: { visible: false },
    })
    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    wrapper.unmount()
  })

  // TODO: fix this test
  it.skip('update:visible', async () => {
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
    const deferred = createDeferred<string>()

    const wrapper = mount(Overlay, {
      props: {
        visible: true,
        onResolve: deferred.resolve,
      },
    })

    wrapper.get<HTMLDivElement>('.modal__confirm').element.click()

    expect(deferred).resolves.toBe('resolve')

    wrapper.unmount()
  })

  it('emit:reject', async () => {
    const deferred = createDeferred<string>()
    const wrapper = mount(Overlay, {
      props: {
        visible: true,
        onReject: deferred.reject,
      },
    })
    wrapper.get<HTMLDivElement>('.modal__cancel').element.click()

    expect(deferred).rejects.toThrow('reject')

    wrapper.unmount()
  })
})
