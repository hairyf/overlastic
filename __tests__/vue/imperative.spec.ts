import { createOverlay, renderOverlay } from '@unoverlays/vue'
import { cancel, clear, confirm, isModalExists, queryModalTitle } from '../utils'
import Overlay from './components/overlay.vue'

describe('@unoverlays/vue:imperative', () => {
  it('mount', () => {
    const callback = createOverlay<unknown, string>(Overlay)

    callback()

    expect(isModalExists()).toBeTruthy()
    clear()
  })

  it('mount:render', () => {
    renderOverlay(Overlay)
    expect(isModalExists()).toBeTruthy()
    clear()
  })

  it('emit:confirm', () => {
    const callback = createOverlay<unknown, string>(Overlay)

    expect(callback()).resolves.toBe('confirm')

    confirm()
    clear()
  })

  it('emit:cancel', () => {
    const callback = createOverlay<unknown, string>(Overlay)

    expect(callback()).rejects.toBe('cancel')

    cancel()
    clear()
  })

  it('manual:confirm', () => {
    const callback = createOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).resolves.toBe('manual-confirm')

    instance.confirm('manual-confirm')
    clear()
  })

  it('manual:cancel', () => {
    const callback = createOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).rejects.toBe('manual-cancel')

    instance.cancel('manual-cancel')
    clear()
  })

  it('manual:not-allowed', () => {
    const callback = createOverlay<unknown, string>(Overlay)
    expect(callback().confirm('manual:not-allowed')).resolves.toBe('manual:not-allowed')
    clear()
  })

  it('transmit:props', () => {
    const callback = createOverlay<{ title?: string }, string>(Overlay)
    callback({ title: 'transmit-props-title' })

    expect(queryModalTitle().textContent).toBe('transmit-props-title')
    clear()
  })
})
