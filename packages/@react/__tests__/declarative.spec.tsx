import { createPromiser } from '@overlays/core'
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
    const promiser = createPromiser<string>()

    const wrapper = mount(Overlay, {
      props: {
        onResolve: promiser.resolve,
        visible: true,
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
        onReject: promiser.reject,
        visible: true,
      },
    })
    wrapper.get<HTMLDivElement>('.modal__cancel').element.click()

    expect(promiser).rejects.toThrow('reject')

    wrapper.unmount()
  })
})
