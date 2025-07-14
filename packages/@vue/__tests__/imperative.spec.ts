import { clear, isModalExists, queryModalTitle, cancel, confirm } from '../../__tests__'
import { defineOverlay, renderOverlay } from '../src'
import Overlay from './components/overlay.vue'

describe('@overlastic/vue:imperative', () => {
  it('mount', () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    callback()

    expect(isModalExists()).toBeTruthy()
    clear()
  })

  it('mount:render', () => {
    renderOverlay(Overlay)
    expect(isModalExists()).toBeTruthy()
    clear()
  })

  it('mount:multiple', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    callback()
    callback()
    callback()
    callback()

    const elements = document.querySelectorAll('.base-modal__mask')
    expect(elements.length).toBe(4)

    clear()
  })

  it('mount:only', async () => {
    const callback = defineOverlay<unknown, string>(Overlay, { only: true })

    callback()
    callback()
    callback()
    callback()

    const elements = document.querySelectorAll('.base-modal__mask')
    expect(elements.length).toBe(1)

    clear()
  })

  it('emit:confirm', () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    expect(callback()).confirms.toBe('confirm')

    confirm()
    clear()
  })

  it('emit:cancel', () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    expect(callback()).cancels.toBe('cancel')

    cancel()
    clear()
  })

  it('manual:confirm', () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).confirms.toBe('manual-confirm')

    instance.confirm('manual-confirm')
    clear()
  })

  it('manual:cancel', () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).cancels.toBe('manual-cancel')

    instance.cancel('manual-cancel')
    clear()
  })

  it('manual:not-allowed', () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    expect(callback().confirm('manual:not-allowed')).resolves.toBe('manual:not-allowed')
    clear()
  })

  it('transmit:props', () => {
    const callback = defineOverlay<{ title?: string }, string>(Overlay)
    callback({ title: 'transmit-props-title' })

    expect(queryModalTitle().textContent).toBe('transmit-props-title')
    clear()
  })
})
