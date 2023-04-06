import { createImperativePromiser } from '@unoverlays/utils'
import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import Overlay from './components/overlay.vue'
describe('@unoverlays/vue:declarative', () => {
  it('mount', async () => {
    const props = reactive({
      visible: false,
    })
    const wrapper = mount(Overlay, {
      props,
    })
    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    wrapper.unmount()
  })

  it('update:visible', async () => {
    const wrapper = mount(Overlay, {
      props: {
        visible: false,
      },
    })

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    await wrapper.setProps({ visible: true })

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeTruthy()

    await wrapper.setProps({ visible: false })

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeFalsy()

    await wrapper.setProps({ visible: true })

    wrapper.unmount()
  })

  it('emit:resolve', async () => {
    const { promise, resolve } = createImperativePromiser<string>()

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
    const { promise, reject } = createImperativePromiser<string>()
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
