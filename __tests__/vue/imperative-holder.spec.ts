import { delay } from '@unoverlays/utils'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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

    await nextTick()

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

    await nextTick()

    expect(isModalExists()).toBeTruthy()

    const element = queryTransitionParent(queryModalWrapper()!)

    expect(element === document.body).toBeTruthy()

    wrapper.unmount()
    clear()
  })

  it('emit:confirm', async () => {
    const wrapper = mount(HolderContainer)

    openModal(wrapper)

    confirm()

    await delay(10)

    expect(wrapper.get('.modal__value').text()).toBe('')

    wrapper.unmount()
    clear()
  })

  it('emit:cancel', async () => {
    const wrapper = mount(HolderContainer)

    openModal(wrapper)

    cancel()

    await nextTick()

    expect(wrapper.get('.modal__value').text()).toBe('')

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

    await nextTick()

    expect(queryModalTitle().textContent).toBe('holder-modal-title')

    wrapper.unmount()
    clear()
  })
})
