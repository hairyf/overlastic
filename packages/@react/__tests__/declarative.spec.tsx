import { createDeferred } from '@overlays/core'
import { describe, expect, it } from 'vitest'
import Overlay from './component/overlay'
import { mount } from './utils'

describe('@overlays/react:declarative', () => {
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

  it('emit:resolve', async () => {
    const deferred = createDeferred<string>()

    const wrapper = mount(Overlay, {
      props: {
        onResolve: deferred.resolve,
        visible: true,
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
        onReject: deferred.reject,
        visible: true,
      },
    })
    wrapper.get<HTMLDivElement>('.modal__cancel').element.click()

    expect(deferred).rejects.toThrow('reject')

    wrapper.unmount()
  })
})
