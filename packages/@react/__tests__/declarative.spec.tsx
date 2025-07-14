import { createDeferred } from '@overlastic/core'
import { describe, expect, it } from 'vitest'
import Overlay from './component/overlay'
import { mount } from './utils'

describe('@overlastic/react:declarative', () => {
  it('mount', async () => {
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

  it('emit:confirm', async () => {
    const deferred = createDeferred<string>()

    const wrapper = mount(Overlay, {
      props: {
        onConfirm: deferred.confirm,
        visible: true,
      },
    })

    wrapper.get<HTMLDivElement>('.modal__confirm').element.click()

    expect(deferred).confirms.toBe('confirm')

    wrapper.unmount()
  })

  it('emit:cancel', async () => {
    const deferred = createDeferred<string>()
    const wrapper = mount(Overlay, {
      props: {
        onCancel: deferred.cancel,
        visible: true,
      },
    })
    wrapper.get<HTMLDivElement>('.modal__cancel').element.click()

    expect(deferred).cancels.toThrow('cancel')

    wrapper.unmount()
  })
})
