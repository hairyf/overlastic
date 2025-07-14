import { describe, expect, it } from 'vitest'
import { isModalExists, openModal, queryModalTitle, cancel, confirm } from '../../__tests__'
import HolderContainer from './component/holder-container'
import { act, mount } from './utils'

describe('@overlastic/react:imperative-holder', () => {
  it('mount', () => {
    const wrapper = mount(HolderContainer, {
      props: { },
    })

    expect(wrapper.get('.base-modal__mask').exists()).toBeFalsy()
    wrapper.unmount()
  })

  it('mount:open', async () => {
    const wrapper = mount(HolderContainer, {
      props: { },
    })

    expect(wrapper.get('.base-modal__mask').exists()).toBeFalsy()

    act(() => openModal(wrapper))

    expect(wrapper.get('.base-modal__mask').exists()).toBeTruthy()

    wrapper.unmount()
  })
  it('mount:teleport', async () => {
    const wrapper = mount(HolderContainer, {
      props: {
        root: document.body,
      },
    })

    act(() => openModal(wrapper))

    const element = wrapper.get('.base-modal__mask').element.parentElement?.parentElement

    expect(element === document.body).toBeTruthy()

    wrapper.unmount()
  })

  it('mount:duration', async () => {
    const wrapper = mount(HolderContainer, {
      props: { duration: 1000 },
    })

    expect(isModalExists()).toBeFalsy()

    act(() => openModal(wrapper))

    expect(isModalExists()).toBeTruthy()

    await act(async () => confirm())

    expect(isModalExists()).toBeFalsy()

    wrapper.unmount()
  })

  it('emit:confirm', async () => {
    const wrapper = mount(HolderContainer)

    act(() => openModal(wrapper))

    await act(async () => confirm())

    expect(wrapper.get('.modal__value').text()).toBe('confirm')

    wrapper.unmount()
  })

  it('emit:cancel', async () => {
    const wrapper = mount(HolderContainer)

    act(() => openModal(wrapper))

    await act(async () => cancel())

    expect(wrapper.get('.modal__value').text()).toBe('cancel')

    wrapper.unmount()
  })

  it('transmit:props', async () => {
    const wrapper = mount(HolderContainer, {
      props: { root: document.body },
    })

    act(() => openModal(wrapper))

    expect(queryModalTitle().textContent).toBe('holder-modal-title')

    wrapper.unmount()
  })
})
