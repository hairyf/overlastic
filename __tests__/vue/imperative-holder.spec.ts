import { delay } from '@unoverlays/utils'
import { mount } from '@vue/test-utils'
import { cancel, clear, confirm, isModalExists, openModal, queryModalTitle, queryModalWrapper, queryTransitionParent } from '../utils'
import HolderContainer from './components/holder-container.vue'

describe('@unoverlays/vue:imperative-holder', () => {
  it('mount', () => {
    const wrapper = mount(HolderContainer)
    expect(() => wrapper.get('.base-modal__mask')).toThrowError()
    wrapper.unmount()
  })

  it('mount:open', async () => {
    const wrapper = mount(HolderContainer, {
      props: { root: false },
    })

    expect(wrapper.find('.base-modal__mask').exists()).toBeFalsy()

    openModal(wrapper)

    await delay()

    expect(wrapper.get('.base-modal__mask').isVisible()).toBeTruthy()

    wrapper.unmount()
    clear()
  })

  it('mount:teleport', async () => {
    const wrapper = mount(HolderContainer, {
      props: {
        root: document.body,
      },
    })

    expect(isModalExists()).toBeFalsy()

    openModal(wrapper)

    await delay()

    expect(isModalExists()).toBeTruthy()

    const element = queryTransitionParent(queryModalWrapper()!)

    expect(element === document.body).toBeTruthy()

    wrapper.unmount()
    clear()
  })

  it('mount:animation', async () => {
    const wrapper = mount(HolderContainer, {
      props: {
        animation: 200,
      },
    })

    expect(isModalExists()).toBeFalsy()

    openModal(wrapper)

    await delay()

    confirm()

    expect(isModalExists()).toBeTruthy()

    await delay(100)

    expect(isModalExists()).toBeTruthy()

    await delay(100)

    expect(isModalExists()).toBeFalsy()

    wrapper.unmount()
    clear()
  })

  it('emit:confirm', async () => {
    const wrapper = mount(HolderContainer)

    openModal(wrapper)

    await delay()

    confirm()

    await delay()

    expect(wrapper.get('.modal__value').text()).toBe('confirm')

    wrapper.unmount()
    clear()
  })

  it('emit:cancel', async () => {
    const wrapper = mount(HolderContainer)

    openModal(wrapper)

    await delay()

    cancel()

    await delay()

    expect(wrapper.get('.modal__value').text()).toBe('cancel')

    wrapper.unmount()
    clear()
  })

  it('transmit:props', async () => {
    const wrapper = mount(HolderContainer, {
      props: {
        root: document.body,
      },
    })

    openModal(wrapper)

    await delay()

    expect(queryModalTitle().textContent).toBe('holder-modal-title')

    wrapper.unmount()
    clear()
  })
})
