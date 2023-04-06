import { defineOverlay, renderOverlay } from '@unoverlays/vue'
import { clear, isModalExists, queryModalTitle, reject, resolve } from '../utils'
import Overlay from './components/overlay.vue'

describe('@unoverlays/vue:imperative', () => {
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

  it('emit:resolve', () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    expect(callback()).resolves.toBe('resolve')

    resolve()
    clear()
  })

  it('emit:reject', () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    expect(callback()).rejects.toBe('reject')

    reject()
    clear()
  })

  it('manual:resolve', () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).resolves.toBe('manual-confirm')

    instance.resolve('manual-confirm')
    clear()
  })

  it('manual:reject', () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).rejects.toBe('manual-cancel')

    instance.reject('manual-cancel')
    clear()
  })

  it('manual:not-allowed', () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    expect(callback().resolve('manual:not-allowed')).resolves.toBe('manual:not-allowed')
    clear()
  })

  it('transmit:props', () => {
    const callback = defineOverlay<{ title?: string }, string>(Overlay)
    callback({ title: 'transmit-props-title' })

    expect(queryModalTitle().textContent).toBe('transmit-props-title')
    clear()
  })
})
